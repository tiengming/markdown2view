/**
 * CaseFlow_DA01 - 实践案例流（默认A型01号样式）
 *
 * 编辑器语法：
 *   - [案例 01] 案例描述内容
 *   - [案例 02] 案例描述内容
 *
 * 渲染效果：
 *   ┌─────────────────────────────────────────┐
 *   │ [案例 01]  案例描述内容                  │
 *   └─────────────────────────────────────────┘
 *
 * 属性：
 *   color?: string  - 标签背景色（默认 #e74c3c 红色）
 */
import type { ThemeColors } from '@engine/composables/useTheme'
import { resolveColor, colorToAlpha } from '@engine/utils/colorUtils'

interface CaseItem {
  num: string
  text: string
}

function parseCaseItems(body: string): CaseItem[] {
  const items: CaseItem[] = []
  const lines = body.split('\n').filter((l) => l.trim())
  for (const line of lines) {
    const m = line.match(/^-\s*\[案例\s*(\d+)\]\s*(.+)$/)
    if (m) {
      items.push({ num: m[1], text: m[2].trim() })
    }
  }
  return items
}

export const CaseFlow_DA01 = {
  id: 'CaseFlow_DA01',
  name: '实践案例流',
  tag: 'case-flow',
  attrs: [{ key: 'color', label: '自定义颜色', required: false, default: '' }],
  example: `<case-flow>
- [案例 01] 从零搭建个人知识库，三周后效率翻倍
- [案例 02] 用 AI 辅助写周报，每周省出两小时
- [案例 03] 坚持早起 100 天，人生发生了什么变化
</case-flow>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const hex = resolveColor(attrs.color || t.accent)
    const items = parseCaseItems(body)

    if (items.length === 0) return ''

    const tagBg = colorToAlpha(hex, 0.12)

    const rows = items
      .map(
        (item) => `
      <section style="display:flex;align-items:center;gap:16px;padding:20px;margin-bottom:12px;border:1px solid rgba(0,0,0,0.06);border-radius:12px;background:#fff;">
                <span style="flex-shrink:0;white-space:nowrap;background:${tagBg};color:${hex};font-size:13px;font-weight:600;padding:6px 14px;border-radius:8px;letter-spacing:0.5px;">案例 ${item.num}</span>
        <span style="flex:1;font-size:15px;line-height:1.6;color:#333;">${item.text}</span>
      </section>
    `,
      )
      .join('')

    return `
      <section style="margin:20px 0;">
        ${rows}
      </section>
    `
  },
}
