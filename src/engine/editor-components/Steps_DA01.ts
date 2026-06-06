import { leaf, withAlpha } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

/**
 * Steps_DA01 - 步骤流（默认A型01号样式）
 *
 * 编辑器语法：
 *   <steps label="HOW IT WORKS" title="标题" hint="提示文字" active="2" color="#e74c3c">
 *   - 步骤名称 | 步骤描述
 *   - 步骤名称 | 步骤描述
 *   </steps>
 *
 * 属性：
 *   label     - 顶部标签（如：HOW IT WORKS）
 *   title     - 标题
 *   hint      - 提示文字
 *   active    - 当前激活步骤（从1开始）
 *   color     - 自定义颜色（默认使用主题色）
 *   （竖向布局请使用 type="DA02"）
 */

export const Steps_DA01 = {
  id: 'Steps_DA01',
  name: '步骤流',
  tag: 'steps',
  attrs: [
    { key: 'label', label: '顶部标签', required: false, default: '' },
    { key: 'title', label: '标题', required: false, default: '' },
    { key: 'hint', label: '提示文字', required: false, default: '' },
    { key: 'active', label: '当前步骤（1/2/3）', required: false, default: '1' },
    { key: 'color', label: '自定义颜色', required: false, default: '' },
    {
      key: 'direction',
      label: '布局方向（horizontal/vertical）',
      required: false,
      default: 'horizontal',
    },
  ],
  example: `<steps label="HOW IT WORKS" title="安装好之后怎么跑起来" hint="左右滑动查看" active="2">
- 输入 | 往知识库里喂东西
- 管理 | 让知识库有序运转
- 输出 | 从知识库取素材做东西
</steps>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const active = parseInt(attrs.active || '1', 10)
    const color = attrs.color || t.accent
    // 解析步骤列表
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

    const isVertical = (attrs.direction || 'horizontal') === 'vertical'

    if (isVertical) {
      // 竖向布局（table 兼容 html2canvas）
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
    } else {
      // 横向布局（table 兼容 html2canvas，支持横向滚动）
      html += `<section style="overflow-x:auto;-webkit-overflow-scrolling:touch">`
      html += `<table border="0" cellpadding="0" cellspacing="12" style="margin:0;border-collapse:separate;border-spacing:12px 0;border:none;min-width:${steps.length * 120}px"><tr>`
      steps.forEach((s, idx) => {
        const isActive = idx + 1 === active
        const borderWidth = isActive ? '2px' : '1px'
        const borderColor = isActive ? color : 'rgb(238,238,238)'
        const bgColor = isActive ? withAlpha(color) : 'rgb(255,255,255)'
        html += `<td style="vertical-align:top;padding:16px 12px;background:${bgColor};border-radius:10px;border:${borderWidth} solid ${borderColor};text-align:center;width:${Math.floor(100 / steps.length)}%">`
        html += `<p style="margin:0px 0px 4px;font-size:20px;font-weight:900;color:${color}">${leaf(idx + 1)}</p>`
        html += `<p style="margin:0px 0px 2px;font-size:13px;font-weight:700;color:rgb(51,65,85)">${leaf(s.name)}</p>`
        html += `<p style="margin:0px;font-size:11px;color:rgb(153,153,153)">${leaf(s.desc)}</p>`
        html += `</td>`
      })
      html += `</tr></table></section>`
    }

    html += `</section>`
    return html
  },
}
