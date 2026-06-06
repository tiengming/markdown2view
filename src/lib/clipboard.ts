// 剪贴板工具：复制富文本（可直接粘贴到公众号后台）与复制 HTML 源码。
// 移植自 r-markdown 的实现：优先用 ClipboardItem 写 text/html + text/plain，
// 失败时降级到 document.execCommand('copy')。

/** 复制纯文本（带降级方案） */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      ta.style.top = '0'
      ta.setAttribute('readonly', 'readonly')
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      ta.setSelectionRange(0, ta.value.length)
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

/** 复制富文本：保留内联样式，粘贴到公众号编辑器排版不丢失 */
export async function copyRichText(contentEl: HTMLElement): Promise<boolean> {
  const html = `<section style="background-color:#fff;color:#333;padding:0">${contentEl.innerHTML}</section>`
  const text = contentEl.innerText
  try {
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain;charset=utf-8' }),
    })
    await navigator.clipboard.write([item])
    return true
  } catch {
    // 降级：选区 + execCommand
    try {
      const tmp = document.createElement('div')
      tmp.innerHTML = html
      tmp.style.position = 'fixed'
      tmp.style.left = '-9999px'
      document.body.appendChild(tmp)
      const range = document.createRange()
      range.selectNodeContents(tmp)
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(range)
      const ok = document.execCommand('copy')
      sel?.removeAllRanges()
      document.body.removeChild(tmp)
      return ok
    } catch {
      return false
    }
  }
}

/** 复制 HTML 源码（全内联样式） */
export async function copyHtmlSource(contentEl: HTMLElement): Promise<boolean> {
  const html = contentEl.innerHTML
  try {
    await navigator.clipboard.writeText(html)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = html
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      ta.style.top = '0'
      ta.setAttribute('readonly', 'readonly')
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      ta.setSelectionRange(0, ta.value.length)
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}
