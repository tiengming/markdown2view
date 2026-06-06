import { domToBlob, waitUntilLoad } from 'modern-screenshot'

// 把 iframe（srcdoc 构建）内容渲染为 PNG Blob。
// 移植自 html-anything/next/src/lib/export/image.ts：
//   1. 截图前等待字体/图片/样式表就绪；
//   2. 临时把 iframe 撑高到内容全高，让浏览器在自然宽度下完整布局；
//   3. 用 documentElement.clientWidth 作为截图宽度，避免 1~2px 漂移导致中文标题换行；
//   4. 显式传入宽高，使 foreignObject SVG 与布局尺寸 1:1。

export type ImageOpts = {
  scale?: number
  type?: 'image/png' | 'image/jpeg' | 'image/webp'
  backgroundColor?: string
  maxHeight?: number
}

const NEXT_FRAME = () =>
  new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

async function waitForDocumentReady(doc: Document, win: Window): Promise<void> {
  if (doc.readyState !== 'complete') {
    await new Promise<void>((res) => {
      const done = () => res()
      doc.addEventListener('readystatechange', () => {
        if (doc.readyState === 'complete') done()
      })
      win.addEventListener?.('load', done, { once: true })
      setTimeout(done, 8000)
    })
  }

  const sheets = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  await Promise.all(
    sheets.map(
      (link) =>
        new Promise<void>((res) => {
          if (link.sheet) return res()
          const done = () => res()
          link.addEventListener('load', done, { once: true })
          link.addEventListener('error', done, { once: true })
          setTimeout(done, 6000)
        }),
    ),
  )

  try {
    const fonts = (doc as Document & { fonts?: FontFaceSet }).fonts
    if (fonts?.ready) await fonts.ready
  } catch {
    /* noop */
  }

  const imgs = Array.from(doc.images)
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((res) => {
          if (img.complete && img.naturalWidth > 0) return res()
          const done = () => res()
          img.addEventListener('load', done, { once: true })
          img.addEventListener('error', done, { once: true })
          if ('decode' in img) img.decode().then(done, done)
          setTimeout(done, 6000)
        }),
    ),
  )

  try {
    await waitUntilLoad(doc.documentElement, { timeout: 6000 })
  } catch {
    /* noop */
  }

  // Tailwind Play CDN 异步注入样式，留两帧 + 小段空闲时间
  await NEXT_FRAME()
  await sleep(120)
  await NEXT_FRAME()
}

function resolveBackground(doc: Document, win: Window, override?: string): string {
  if (override) return override
  const tryColor = (c?: string | null) => {
    if (!c) return null
    const v = c.trim()
    if (!v || v === 'transparent' || v === 'rgba(0, 0, 0, 0)') return null
    return v
  }
  try {
    const bodyInline = tryColor(doc.body?.style.backgroundColor)
    if (bodyInline) return bodyInline
    const bodyComputed = tryColor(win.getComputedStyle(doc.body).backgroundColor)
    if (bodyComputed) return bodyComputed
    const htmlComputed = tryColor(win.getComputedStyle(doc.documentElement).backgroundColor)
    if (htmlComputed) return htmlComputed
  } catch {
    /* cross-origin or detached doc */
  }
  return '#ffffff'
}

function fullScrollHeight(doc: Document): number {
  const b = doc.body
  const h = doc.documentElement
  return Math.max(
    b?.scrollHeight ?? 0,
    b?.offsetHeight ?? 0,
    h?.scrollHeight ?? 0,
    h?.offsetHeight ?? 0,
    h?.clientHeight ?? 0,
  )
}

export async function iframeToBlob(iframe: HTMLIFrameElement, opts: ImageOpts = {}): Promise<Blob> {
  const doc = iframe.contentDocument
  const win = iframe.contentWindow
  if (!doc || !win) throw new Error('iframe 尚未就绪')

  await waitForDocumentReady(doc, win)

  const prevIframeHeight = iframe.style.height
  const prevDocOverflow = doc.documentElement.style.overflow
  const prevBodyOverflow = doc.body.style.overflow

  const fullHeight = fullScrollHeight(doc)
  if (!fullHeight) throw new Error('预览暂无内容')
  iframe.style.height = `${fullHeight}px`
  doc.documentElement.style.overflow = 'visible'
  doc.body.style.overflow = 'visible'

  await NEXT_FRAME()
  await sleep(60)
  await NEXT_FRAME()

  try {
    const layoutWidth =
      doc.documentElement.clientWidth || iframe.clientWidth || doc.body.scrollWidth
    const layoutHeight = fullScrollHeight(doc)

    const scale = opts.scale ?? 2
    const safeMax = opts.maxHeight ?? Math.floor(16000 / scale)
    const captureHeight = Math.min(layoutHeight, safeMax)

    const backgroundColor = resolveBackground(doc, win, opts.backgroundColor)

    const blob = await domToBlob(doc.documentElement as unknown as HTMLElement, {
      scale,
      type: opts.type ?? 'image/png',
      backgroundColor,
      width: layoutWidth,
      height: captureHeight,
      fetch: { requestInit: { cache: 'force-cache' } },
    })
    if (!blob) throw new Error('截图失败')
    return blob
  } finally {
    iframe.style.height = prevIframeHeight
    doc.documentElement.style.overflow = prevDocOverflow
    doc.body.style.overflow = prevBodyOverflow
  }
}

export async function elementToBlob(element: HTMLElement, opts: ImageOpts = {}): Promise<Blob> {
  await NEXT_FRAME()
  await sleep(60)
  await NEXT_FRAME()

  const rect = element.getBoundingClientRect()
  const width = Math.ceil(rect.width || element.offsetWidth)
  const height = Math.ceil(rect.height || element.offsetHeight)
  if (!width || !height) throw new Error('导出节点暂无尺寸')

  const blob = await domToBlob(element, {
    scale: opts.scale ?? 2,
    type: opts.type ?? 'image/png',
    backgroundColor: opts.backgroundColor ?? '#ffffff',
    width,
    height,
    fetch: { requestInit: { cache: 'force-cache' } },
  })
  if (!blob) throw new Error('截图失败')
  return blob
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function downloadIframeAsImage(
  iframe: HTMLIFrameElement,
  basename = 'markdown2view',
): Promise<void> {
  const blob = await iframeToBlob(iframe)
  downloadBlob(blob, `${basename}-${Date.now()}.png`)
}
