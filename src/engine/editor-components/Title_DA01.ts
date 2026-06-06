import { leaf } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

/**
 * Title_DA01 - 标题卡片（默认A型01号样式）
 *
 * 编辑器语法：
 *   <title badge="GUIDE" subtitle="副标题" chips="关键词1|关键词2">文章标题</title>
 *
 * 属性：
 *   badge    - 分类标签（如：GUIDE、更新、教程）
 *   subtitle - 副标题
 *   chips    - 关键词标签，| 分隔
 */

// ── 样式常量 ──────────────────────────────────────────
const S = {
  card:
    'margin:0px 0px 30px;box-shadow:rgba(15,23,42,0.05) 0px 10px 24px;' +
    'border-radius:14px;border:1px solid rgba(229,231,235,0.9);' +
    'overflow:hidden;background:linear-gradient(135deg,rgb(248,250,252) 0%,rgb(238,244,251) 100%)',
  body: 'padding:20px;background:rgba(255,255,255,0.92)',
  badge: (color: string) =>
    `margin:0px;padding:0px 0px 10px;font-size:10px;color:${color};` +
    'letter-spacing:2.4px;text-transform:uppercase;font-weight:800',
  title:
    'margin:0px;font-size:28px;font-weight:900;color:rgb(17,24,39);' +
    'line-height:1.2;letter-spacing:-0.5px;word-break:break-all',
  subtitle:
    'margin:0px;padding:10px 0px 0px;font-size:14px;color:rgb(71,85,105);' +
    'line-height:1.7;font-weight:400;text-align:justify;letter-spacing:0.3px',
  chips: 'margin:0px;padding:10px 0px 0px;font-size:0px;line-height:1.8',
  chip:
    'display:inline-block;margin:0px 8px 0px 0px;font-size:10px;' +
    'color:#576B95;font-weight:700;letter-spacing:0.02em;white-space:nowrap',
  statLabel:
    'margin:0px 0px 8px;font-size:10px;line-height:1.2;' +
    'color:rgb(148,163,184);font-weight:800;letter-spacing:0.4px',
  statNum: (bg: string) =>
    `display:inline-block;width:64px;height:64px;line-height:64px;` +
    `text-align:center;border-radius:10px;background-color:${bg};` +
    'box-shadow:rgba(15,23,42,0.16) 0px 12px 24px',
  numText:
    'font-size:30px;line-height:64px;color:rgb(255,255,255);' +
    'font-weight:900;letter-spacing:-1px',
  charCount:
    'margin:8px 0px 0px;font-size:10px;color:rgb(148,163,184);' +
    'font-weight:700;letter-spacing:0.3px',
  tdLeft: 'vertical-align:top;border:0px;padding:0px;text-align:left',
  tdRight: 'vertical-align:top;border:0px;padding:0px;text-align:right',
  table:
    'border:0px;border-collapse:collapse;table-layout:fixed;' +
    'min-width:115px;width:100%;margin-bottom:0',
}

// ── 辅助函数 ──────────────────────────────────────────
function countChars(raw: string): { chars: number; minutes: number } {
  const text = raw
    .replace(/<title[\s\S]*?<\/title>\s*/, '')
    .replace(/[#*`>[\]!|_~=-]/g, '')
    .replace(/\s+/g, '')
  const chars = text.length
  return { chars, minutes: Math.max(1, Math.ceil(chars / 400)) }
}

function renderChips(raw: string): string {
  return raw
    .split('|')
    .map((c) => `<span style="${S.chip}">${leaf('#' + c.trim())}</span>`)
    .join('')
}

// ── 组件定义 ──────────────────────────────────────────
export const Title_DA01 = {
  id: 'Title_DA01',
  name: '标题卡片',
  tag: 'title',
  attrs: [
    { key: 'type', label: '样式类型', required: false, default: 'DA01', options: ['DA01', 'DA02'] },
    { key: 'badge', label: '标签', required: false, default: '' },
    { key: 'subtitle', label: '副标题', required: false, default: '' },
    { key: 'chips', label: '关键词（|分隔）', required: false, default: '' },
    { key: 'color', label: '自定义颜色', required: false, default: '' },
  ],
  example: `<title badge="GUIDE" subtitle="这是一份包含所有可用 Markdown 指令及扩展标签的完整演示稿。" chips="图片并排|窗口滚动|渐变文字">功能全集：排版组件指南</title>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors, raw: string = ''): string {
    const { chars, minutes } = countChars(raw)
    const color = attrs.color || t.accent

    return `
      <section style="${S.card}">
        <section style="${S.body}">
          <section class="tableWrapper">
            <table style="${S.table}">
              <colgroup><col><col style="width:90px;"></colgroup>
              <tbody><tr>
                <td valign="top" align="left" style="${S.tdLeft}">
                  ${attrs.badge ? `<p style="${S.badge(color)}">${leaf(attrs.badge)}</p>` : ''}
                  ${body ? `<p style="${S.title}">${leaf(body)}</p>` : ''}
                  ${attrs.subtitle ? `<p style="${S.subtitle}">${leaf(attrs.subtitle)}</p>` : ''}
                  ${attrs.chips ? `<section style="${S.chips}">${renderChips(attrs.chips)}</section>` : ''}
                </td>
                <td data-colwidth="90" width="90" valign="top" align="right" style="${S.tdRight}">
                  <p style="${S.statLabel}">${leaf('预计阅读(分)')}</p>
                  <section style="${S.statNum(color)}">
                    <span style="${S.numText}">${leaf(minutes)}</span>
                  </section>
                  <p style="${S.charCount}">${leaf(`共 ${chars} 字`)}</p>
                </td>
              </tr></tbody>
            </table>
          </section>
        </section>
      </section>`
  },
}
