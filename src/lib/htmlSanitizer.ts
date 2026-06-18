// AI 生成 HTML 的轻量级净化器。
// 设计原则：
// 1. 不引入外部依赖，利用浏览器 DOMParser 实现。
// 2. 作为 iframe sandbox 的第二道防线，默认禁用脚本与事件处理器。
// 3. 保留排版所需的常见标签、class、style 与外部样式表。
// 4. 对 URL 类属性做协议白名单校验，防止 javascript: / data: 等攻击向量。

const ALLOWED_TAGS = new Set([
  // 文档骨架
  'html', 'head', 'body', 'title', 'meta', 'link', 'style',
  // 布局与内容
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'section', 'article', 'main', 'header', 'footer', 'nav', 'aside',
  'figure', 'figcaption', 'details', 'summary',
  // 交互元素（保留标签，但移除事件属性）
  'button', 'a', 'input', 'textarea', 'select', 'option', 'label', 'form', 'fieldset', 'legend',
  // 媒体与交互
  'img', 'a', 'picture', 'source', 'video', 'audio', 'track',
  // 表格
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
  // 列表
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  // 格式化
  'br', 'hr', 'pre', 'code', 'blockquote', 'q', 'cite',
  'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ins', 'sub', 'sup', 'mark', 'small',
  'abbr', 'dfn', 'time', 'address', 'kbd', 'samp', 'var',
  // SVG（保留基础图形，移除 script/事件）
  'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan', 'defs', 'use', 'symbol', 'lineargradient', 'radialgradient', 'stop',
])

const ALLOWED_ATTRS = new Set([
  'class', 'id', 'name', 'title', 'alt', 'role', 'aria-label', 'aria-hidden',
  'dir', 'lang', 'tabindex', 'hidden',
  'href', 'src', 'srcset', 'sizes', 'poster', 'preload', 'controls', 'loop', 'muted', 'autoplay',
  'width', 'height', 'viewbox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd',
  'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'points',
  'colspan', 'rowspan', 'scope', 'start', 'reversed', 'type', 'value',
  'target', 'rel', 'download',
  // style 需要额外校验，见 processStyleAttr
  'style',
])

const URL_ATTRS = new Set(['href', 'src', 'srcset', 'poster', 'data'])

const SAFE_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:'])

function isSafeUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return true
  // 允许相对路径、锚点、空值；拒绝 javascript: 伪协议
  if (/^(\/|#|\.\.?\/)/.test(trimmed)) {
    return !/^javascript:/i.test(trimmed)
  }
  try {
    const url = new URL(trimmed, 'http://localhost')
    return SAFE_URL_PROTOCOLS.has(url.protocol)
  } catch {
    // 无法解析时保守放行相对路径，拒绝带协议的可疑绝对路径
    return !/^[a-z][a-z0-9+.-]*:/i.test(trimmed)
  }
}

function isSafeSrcset(value: string): boolean {
  return value.split(',').every((part) => {
    const url = part.trim().split(/\s+/)[0]
    return !url || isSafeUrl(url)
  })
}

function isEventHandlerAttr(name: string): boolean {
  return name.startsWith('on') && name.length > 2
}

function processStyleAttr(value: string): string | null {
  // 拒绝 expression、javascript、behavior 等 IE 遗留攻击向量
  if (/expression|javascript|behavior|@import|url\s*\(/i.test(value)) {
    return null
  }
  return value
}

function processStyleElement(css: string): string | null {
  // 拒绝 @import、expression、javascript URL
  if (/@import|expression|javascript\s*:|behavior\s*:/i.test(css)) {
    return null
  }
  return css
}

function sanitizeNode(node: Node, ownerDoc: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return ownerDoc.createTextNode(node.textContent || '')
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return ownerDoc.createComment(node.nodeValue || '')
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null
  }

  const el = node as Element
  const tagName = el.tagName.toLowerCase()

  // script 标签：完全丢弃，不保留内容
  if (tagName === 'script') {
    return null
  }

  if (!ALLOWED_TAGS.has(tagName)) {
    // 未知标签：保留其文本内容，丢弃标签本身
    const fragment = ownerDoc.createDocumentFragment()
    el.childNodes.forEach((child) => {
      const sanitized = sanitizeNode(child, ownerDoc)
      if (sanitized) fragment.appendChild(sanitized)
    })
    return fragment
  }

  // 处理 style 标签内容
  if (tagName === 'style') {
    const cleanCss = processStyleElement(el.textContent || '')
    if (!cleanCss) return null
    const newStyle = ownerDoc.createElement('style')
    newStyle.textContent = cleanCss
    return newStyle
  }

  const newEl = ownerDoc.createElement(tagName)

  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i]
    if (!attr) continue
    const name = attr.name.toLowerCase()

    // 禁止事件处理器
    if (isEventHandlerAttr(name)) continue

    // 禁止非白名单属性
    if (!ALLOWED_ATTRS.has(name)) continue

    let value = attr.value

    // URL 属性校验
    if (URL_ATTRS.has(name)) {
      if (name === 'srcset') {
        if (!isSafeSrcset(value)) continue
      } else if (!isSafeUrl(value)) {
        continue
      }
    }

    // style 属性校验
    if (name === 'style') {
      const cleanStyle = processStyleAttr(value)
      if (cleanStyle === null) continue
      value = cleanStyle
    }

    try {
      newEl.setAttribute(name, value)
    } catch {
      // 非法属性名时忽略
    }
  }

  // 递归处理子节点
  el.childNodes.forEach((child) => {
    const sanitized = sanitizeNode(child, ownerDoc)
    if (sanitized) newEl.appendChild(sanitized)
  })

  return newEl
}

/**
 * 净化 HTML 字符串，移除危险标签、事件处理器与非法 URL。
 * @param html 原始 HTML
 * @returns 净化后的 HTML
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''

  const trimmed = html.trim()
  const hasFullDocument = /^<!DOCTYPE\s+html/i.test(trimmed) || /^<html[\s>]/i.test(trimmed)

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  if (hasFullDocument) {
    const newHtml = doc.createElement('html')
    const newHead = doc.createElement('head')
    const newBody = doc.createElement('body')

    doc.head.childNodes.forEach((child) => {
      const sanitized = sanitizeNode(child, doc)
      if (sanitized) newHead.appendChild(sanitized)
    })
    doc.body.childNodes.forEach((child) => {
      const sanitized = sanitizeNode(child, doc)
      if (sanitized) newBody.appendChild(sanitized)
    })

    // 保留 html/body 上的安全属性
    for (const el of [doc.documentElement, doc.body]) {
      const target = el === doc.documentElement ? newHtml : newBody
      const tag = el.tagName.toLowerCase()
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i]
        if (!attr) continue
        const name = attr.name.toLowerCase()
        if (!ALLOWED_ATTRS.has(name) || isEventHandlerAttr(name)) continue
        if (name === 'style' && processStyleAttr(attr.value) === null) continue
        try {
          target.setAttribute(name, attr.value)
        } catch { /* ignore */ }
      }
      // 始终保留 html 标签上的 xmlns / lang
      if (tag === 'html') {
        if (el.getAttribute('lang')) newHtml.setAttribute('lang', el.getAttribute('lang')!)
      }
    }

    newHtml.appendChild(newHead)
    newHtml.appendChild(newBody)
    return '<!DOCTYPE html>\n' + newHtml.outerHTML
  }

  const fragment = doc.createDocumentFragment()
  doc.body.childNodes.forEach((child) => {
    const sanitized = sanitizeNode(child, doc)
    if (sanitized) fragment.appendChild(sanitized)
  })

  const wrapper = doc.createElement('div')
  wrapper.appendChild(fragment)
  return wrapper.innerHTML
}
