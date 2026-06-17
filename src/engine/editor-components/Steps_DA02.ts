/**
 * Steps_DA02 - 竖向步骤流（默认A型02号样式）
 *
 * 与 DA01 的区别：
 *   DA01 = 横向步骤流（flex row，卡片并排）
 *   DA02 = 竖向步骤流（flex column，卡片堆叠）
 *
 * 编辑器语法：
 *   <steps type="DA02" label="VERTICAL STEPS" title="竖向步骤流" active="2">
 *   - 注册账号 | 填写基本信息完成注册
 *   - 实名认证 | 上传证件完成身份验证
 *   - 开始使用 | 选择功能模块开始体验
 *   </steps>
 */
import { leaf, withAlpha } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

export const Steps_DA02 = {
  id: 'Steps_DA02',
  name: '步骤流',
  tag: 'steps',
  attrs: [
    { key: 'label', label: '顶部标签', required: false, default: '' },
    { key: 'title', label: '标题', required: false, default: '' },
    { key: 'hint', label: '提示文字', required: false, default: '' },
    { key: 'active', label: '当前步骤（1/2/3）', required: false, default: '1' },
    { key: 'color', label: '自定义颜色', required: false, default: '' },
  ],
  example: `<steps type="DA02" label="VERTICAL STEPS" title="竖向步骤流" active="2">
- 注册账号 | 填写基本信息完成注册
- 实名认证 | 上传证件完成身份验证
- 开始使用 | 选择功能模块开始体验
</steps>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const active = parseInt(attrs.active || '1', 10)
    const color = attrs.color || t.accent

    const steps: { name: string; desc: string }[] = []
    body.split('\n').forEach((line) => {
      const m = line.trim().match(/^-\s*(.+)\s*\|\s*(.+)/)
      if (m) steps.push({ name: m[1].trim(), desc: m[2].trim() })
    })

    let html = `<section style="margin:0px 0px 24px;padding:20px;background:rgb(250,251,254);border-radius:12px;border:1px solid rgb(238,238,238)">`
    if (attrs.label)
      html += `<p style="margin:0px 0px 4px;font-size:10px;color:rgb(153,153,153);letter-spacing:2px;font-weight:700">${leaf(attrs.label)}</p>`
    if (attrs.title)
      html += `<p style="margin:0px 0px 4px;font-size:18px;font-weight:800;color:rgb(26,26,26)">${leaf(attrs.title)}</p>`
    if (attrs.hint)
      html += `<p style="margin:0px 0px 16px;font-size:12px;color:rgb(153,153,153)">${leaf(attrs.hint)}</p>`

    // 竖向布局（inline-block，兼容 html2canvas，避免 table 标签污染剪贴板）
    steps.forEach((s, idx) => {
      const isActive = idx + 1 === active
      const borderWidth = isActive ? '2px' : '1px'
      const borderColor = isActive ? color : 'rgb(238,238,238)'
      const bgColor = isActive ? withAlpha(color) : 'rgb(255,255,255)'
      const mb = idx < steps.length - 1 ? 'margin-bottom:12px;' : ''
      html += `<section style="${mb}padding:16px;background:${bgColor};border-radius:10px;border:${borderWidth} solid ${borderColor}">`
      html += `<section style="display:inline-block;vertical-align:top;width:32px;margin-right:12px"><section style="width:32px;height:32px;border-radius:50%;background:${isActive ? color : 'rgb(238,238,238)'};text-align:center;line-height:32px"><span style="font-size:14px;font-weight:900;color:${isActive ? '#fff' : 'rgb(153,153,153)'}">${leaf(idx + 1)}</span></section></section>`
      html += `<section style="display:inline-block;vertical-align:top;padding-top:4px">`
      html += `<p style="margin:0px 0px 2px;font-size:14px;font-weight:700;color:rgb(51,65,85)">${leaf(s.name)}</p>`
      html += `<p style="margin:0px;font-size:12px;color:rgb(153,153,153)">${leaf(s.desc)}</p>`
      html += `</section>`
      html += `</section>`
    })

    html += `</section>`
    return html
  },
}
