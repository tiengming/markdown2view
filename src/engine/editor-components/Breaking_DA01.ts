import { leaf } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

/**
 * Breaking_DA01 - 突发/重大更新卡片（默认A型01号样式）
 *
 * 编辑器语法：
 *   <breaking badge="NEW" title="标题" subtitle="副标题" chips="标签1|标签2" color="#e74c3c">
 *   正文内容
 *   </breaking>
 *
 * 属性：
 *   badge    - 标签文字（如：NEW、HOT、更新）
 *   title    - 标题
 *   subtitle - 副标题
 *   chips    - 关键词标签，| 分隔
 *   color    - 自定义颜色（默认使用主题色）
 */

export const Breaking_DA01 = {
  id: 'Breaking_DA01',
  name: '突发卡片',
  tag: 'breaking',
  attrs: [
    { key: 'badge', label: '标签', required: false, default: '' },
    { key: 'title', label: '标题', required: false, default: '' },
    { key: 'subtitle', label: '副标题', required: false, default: '' },
    { key: 'chips', label: '关键词（|分隔）', required: false, default: '' },
    { key: 'color', label: '自定义颜色', required: false, default: '' },
  ],
  example: `<breaking badge="NEW" title="功能全集文档上线" subtitle="支持一键复制，即装即用" chips="高效|美观">
这个组件适合用于文章开头，展示最重要的核心结论或更新摘要。
</breaking>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const color = attrs.color || t.accent

    /** 将任意 CSS 颜色转为带透明度的 rgba 字符串 */
    function withAlpha(c: string, alpha: number): string {
      if (/^#[0-9a-fA-F]{3,8}$/.test(c)) {
        // hex → 8位 hex（带 alpha）
        const hex = c.length === 4 ? '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3] : c.slice(0, 7)
        const aHex = Math.round(alpha * 255)
          .toString(16)
          .padStart(2, '0')
        return hex + aHex
      }
      // 命名颜色等：用临时元素解析 RGB
      if (typeof document !== 'undefined') {
        const el = document.createElement('div')
        el.style.color = c
        document.body.appendChild(el)
        const computed = getComputedStyle(el).color
        document.body.removeChild(el)
        const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (m) return `rgba(${m[1]},${m[2]},${m[3]},${alpha})`
      }
      return c // 兜底
    }

    const light = attrs.color ? withAlpha(color, 0.15) : t.light
    const border = attrs.color ? withAlpha(color, 0.2) : t.border

    let html = `<section style="margin:24px 0px;padding:28px 24px;background:radial-gradient(circle 60px at 92% 30px,${light} 96%,transparent 100%),linear-gradient(135deg,${light},rgba(255,255,255,0.8));border:1px solid ${border};border-radius:16px">`

    if (attrs.badge)
      html += `<span style="display:inline-block;padding:4px 12px;background:${color};color:rgb(255,255,255);border-radius:6px;font-size:11px;font-weight:700;letter-spacing:1px;margin-bottom:12px">${leaf(attrs.badge)}</span>`
    if (attrs.title)
      html += `<p style="margin:0px 0px 8px;font-size:22px;font-weight:800;color:rgb(26,26,26);line-height:1.4">${leaf(attrs.title)}</p>`
    if (attrs.subtitle)
      html += `<p style="margin:0px 0px 12px;font-size:14px;color:rgb(102,102,102)">${leaf(attrs.subtitle)}</p>`
    if (attrs.chips) {
      html += `<section style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">`
      attrs.chips.split('|').forEach((c) => {
        html += `<span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:rgba(255,255,255,0.8);color:${color};border:1px solid ${border}">${leaf('#' + c.trim())}</span>`
      })
      html += `</section>`
    }
    if (body.trim())
      html += `<section style="font-size:14px;color:rgb(85,85,85);line-height:1.8;margin-top:8px">${leaf(body.trim())}</section>`
    html += `</section>`
    return html
  },
}
