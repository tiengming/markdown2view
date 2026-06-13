import { leaf } from '@engine/utils/helpers'
import { resolveColor, darkenColor, colorToAlpha } from '@engine/utils/colorUtils'
import type { ThemeColors } from '@engine/composables/useTheme'

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
 *   light   - 浅色背景（设置为任意值启用浅色背景模式）
 */

export const CTA_DA01 = {
  id: 'CTA_DA01',
  name: '行动号召',
  tag: 'cta',
  attrs: [
    {
      key: 'label',
      label: '标签',
      required: false,
      default: '',
      description: '顶部引导标签，如 GET STARTED',
    },
    {
      key: 'title',
      label: '标题',
      required: false,
      default: '',
      description: '主标题文字，用于号召行动',
    },
    {
      key: 'button',
      label: '按钮文字',
      required: false,
      default: '',
      description: '按钮上显示的文字，如「立即复制下方代码」',
    },
    {
      key: 'color',
      label: '自定义颜色',
      required: false,
      default: '',
      description: '自定义颜色，填入 CSS 颜色值覆盖默认主题色，使用颜色单词或十六进制颜色值',
    },
    {
      key: 'light',
      label: '浅色背景',
      required: false,
      default: '',
      description: '设置为任意值启用浅色背景模式',
    },
  ],
  example: `<cta label="GET STARTED" title="准备好开始你的创作了吗？" button="立即复制下方代码"></cta>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const hex = resolveColor(attrs.color || t.accent)

    if (attrs.light) {
      // 浅色背景：6% 透明度主题色 + 深色文字 + 实色按钮
      const bg = colorToAlpha(hex, 0.06)

      let html = `<section style="margin:24px 0px;padding:32px 24px;background:${bg};border-radius:16px;text-align:center">`

      if (attrs.label)
        html += `<p style="margin:0px 0px 8px;font-size:11px;letter-spacing:3px;font-weight:700;color:${hex}">${leaf(attrs.label)}</p>`

      if (attrs.title)
        html += `<p style="margin:0px 0px 16px;font-size:20px;font-weight:800;line-height:1.4;color:rgb(26,26,26)">${leaf(attrs.title)}</p>`

      if (attrs.button)
        html += `<span style="display:inline-block;padding:12px 32px;background:${hex};border-radius:8px;font-weight:700;letter-spacing:1px;color:rgb(255,255,255)">${leaf(attrs.button)}</span>`

      if (body.trim())
        html += `<section style="margin-top:16px;font-size:14px;color:rgb(85,85,85);line-height:1.7">${leaf(body.trim())}</section>`

      html += `</section>`
      return html
    }

    // 深色渐变背景（默认）
    const darkHex = darkenColor(hex)

    let html = `<section style="margin:24px 0px;padding:32px 24px;background:linear-gradient(135deg,${hex},${darkHex});border-radius:16px;text-align:center;color:rgb(255,255,255)">`

    if (attrs.label)
      html += `<p style="margin:0px 0px 8px;font-size:11px;letter-spacing:3px;font-weight:700;opacity:0.8">${leaf(attrs.label)}</p>`

    if (attrs.title)
      html += `<p style="margin:0px 0px 16px;font-size:20px;font-weight:800;line-height:1.4">${leaf(attrs.title)}</p>`

    if (attrs.button)
      html += `<span style="display:inline-block;padding:12px 32px;background:rgba(255,255,255,0.2);border-radius:8px;font-weight:700;letter-spacing:1px;backdrop-filter:blur(4px)">${leaf(attrs.button)}</span>`

    if (body.trim())
      html += `<section style="margin-top:16px;font-size:14px;opacity:0.85;line-height:1.7">${leaf(body.trim())}</section>`

    html += `</section>`
    return html
  },
}
