/**
 * Timeline_DA01 - 时间线（默认A型01号样式）
 *
 * 编辑器语法：
 *   <timeline>
 *   - 2024年01月 | 项目启动 | 完成团队组建和需求分析 | ![新版](https://example.com/v1.jpg)[100% 120px]
 *   - 2024年06月 | 一期上线 | 核心功能发布，用户突破1万
 *   - 2025年01月 | 二期迭代 | 新增AI辅助功能，用户突破10万 | ![二期](https://example.com/v2.jpg)[100% 120px]
 *   </timeline>
 *
 * 格式：- 日期 | 标题 | 描述 | ![alt](url)[宽 高]（图片可选）
 *
 * 属性：
 *   color?: string  - 时间线颜色（默认使用主题色）
 */
import type { ThemeColors } from '@engine/composables/useTheme'
import { resolveColor, colorToAlpha } from '@engine/utils/colorUtils'
import { leaf } from '@engine/utils/helpers'

interface TimelineImage {
  src: string
  alt: string
  width: string
  height: string
}

interface TimelineItem {
  date: string
  title: string
  desc: string
  image: TimelineImage | null
}

function parseTimelineItems(body: string): TimelineItem[] {
  const items: TimelineItem[] = []
  const lines = body.split('\n').filter((l) => l.trim())

  for (const line of lines) {
    const m = line.match(
      /^-\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)(?:\s*\|\s*!\[(.*?)\]\((.*?)\)\[(\S+)\s+(\S+)\])?\s*$/,
    )
    if (m) {
      items.push({
        date: m[1].trim(),
        title: m[2].trim(),
        desc: m[3].trim(),
        image: m[4] !== undefined ? { alt: m[4], src: m[5], width: m[6], height: m[7] } : null,
      })
    }
  }
  return items
}

export const Timeline_DA01 = {
  id: 'Timeline_DA01',
  name: '时间线',
  tag: 'timeline',
  attrs: [{ key: 'color', label: '自定义颜色', required: false, default: '' }],
  example: `<timeline>
- 2024年01月 | 项目启动 | 完成团队组建和需求分析 | ![新版](https://picsum.photos/400/120?random=1)[100% 120px]
- 2024年06月 | 一期上线 | 核心功能发布，用户突破1万
- 2025年01月 | 二期迭代 | 新增AI辅助功能，用户突破10万 | ![二期](https://picsum.photos/400/120?random=2)[100% 120px]
</timeline>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const hex = resolveColor(attrs.color || t.accent)
    const items = parseTimelineItems(body)

    if (items.length === 0) return ''

    const dotBg = colorToAlpha(hex, 0.15)
    const lineColor = colorToAlpha(hex, 0.3)

    const rows = items
      .map((item, idx) => {
        const isLast = idx === items.length - 1

        // 图片 HTML
        let imageHtml = ''
        if (item.image) {
          const style: string[] = ['border-radius:12px', 'display:block', 'margin-top:12px']
          if (item.image.width) style.push(`width:${item.image.width}`)
          if (item.image.height) style.push(`height:${item.image.height}`, 'object-fit:cover')
          imageHtml = `<img src="${item.image.src}" alt="${item.image.alt}" style="${style.join(';')};" />`
        }

        // 左侧圆点（float），圆心 = 4px(margin) + 6px(半径) = 10px
        const dotHtml = `<section style="float:left;width:12px;height:12px;border-radius:50%;background:${hex};box-shadow:0 0 0 4px ${dotBg};margin:5px 0 0 4px;"></section>`

        // 右侧内容（border-left 做竖线，对齐圆心 10px）
        const borderStyle = isLast
          ? 'border-left:2px solid transparent;'
          : `border-left:2px solid ${lineColor};`

        return `
        <section style="margin-bottom:${isLast ? '0' : '32px'};overflow:hidden;">
          ${dotHtml}
          <section style="margin-left:9px;${borderStyle}padding-left:18px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:${hex};letter-spacing:0.5px;">${leaf(item.date)}</p>
            <p style="margin:0 0 6px;font-size:17px;font-weight:800;color:rgb(17,24,39);line-height:1.4;">${leaf(item.title)}</p>
            <p style="margin:0;font-size:14px;color:rgb(100,116,139);line-height:1.6;">${leaf(item.desc)}</p>
            ${imageHtml}
          </section>
        </section>`
      })
      .join('')

    return `
      <section style="margin:24px 0;padding:24px;background:linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.6));border:1px solid rgba(0,0,0,0.06);border-radius:16px;">
        ${rows}
      </section>`
  },
}
