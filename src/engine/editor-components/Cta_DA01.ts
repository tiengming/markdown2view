/**
 * CTA_DA01 - 行动号召卡片（默认A型01号样式）
 *
 * 编辑器语法：
 *   <cta label="GET STARTED" title="准备好开始你的创作了吗？" button="立即复制下方代码">
 *   </cta>
 *
 * 属性：
 *   label   - 标签文字（如 GET STARTED）
 *   title   - 标题
 *   button  - 按钮文字
 *   color   - 自定义颜色（默认使用主题色）
 */
import { leaf } from '@engine/utils/helpers'
import { resolveColor } from '@engine/utils/colorUtils'
import type { ThemeColors } from '@engine/composables/useTheme'

export const CTA_DA01 = {
  id: 'CTA_DA01',
  name: '行动号召',
  tag: 'cta',
  attrs: [
    { key: 'label', label: '标签', required: false, default: '' },
    { key: 'title', label: '标题', required: false, default: '' },
    { key: 'button', label: '按钮文字', required: false, default: '' },
    { key: 'color', label: '自定义颜色', required: false, default: '' },
  ],
  example: `<cta label="GET STARTED" title="准备好开始你的创作了吗？" button="立即复制下方代码"></cta>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const hex = resolveColor(attrs.color || t.accent)

    let html = `<section style="margin:24px 0px;padding:28px 24px;background:rgb(250,251,254);border-radius:14px;text-align:center">`

    if (attrs.label)
      html += `<p style="margin:0px 0px 8px;font-size:10px;font-weight:700;color:${hex};letter-spacing:3px;text-transform:uppercase">${leaf(attrs.label)}</p>`

    if (attrs.title)
      html += `<p style="margin:0px 0px 20px;font-size:20px;font-weight:800;color:rgb(26,26,26);line-height:1.4">${leaf(attrs.title)}</p>`

    if (attrs.button)
      html += `<a style="display:inline-block;padding:12px 32px;background:${hex};color:rgb(255,255,255);border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px">${leaf(attrs.button)}</a>`

    if (body.trim())
      html += `<section style="margin-top:16px;font-size:14px;color:rgb(85,85,85);line-height:1.7">${leaf(body.trim())}</section>`

    html += `</section>`
    return html
  },
}
