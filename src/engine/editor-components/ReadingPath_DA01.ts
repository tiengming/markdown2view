import { leaf } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

/**
 * Reading Path - 阅读路线导航
 *
 * 编辑器语法：
 *   <reading-path></reading-path>
 *
 * 自动从文档的 h2 标题中提取章节列表，渲染为横向导航卡片。
 * 需要在 markdownParser 中先收集 h2List，再传入 render。
 */

// ── 样式常量 ──────────────────────────────────────────
const S = {
  wrapper: 'margin:0px 0px 30px',
  header:
    'display:flex;align-items:flex-end;justify-content:space-between;' +
    'padding-bottom:14px;gap:12px',
  label:
    'margin:0px;padding:0px 0px 6px;font-size:10px;color:rgb(100,116,139);' +
    'text-transform:uppercase;letter-spacing:2.8px;font-weight:800;white-space:nowrap',
  heading: 'margin:0px;font-size:16px;line-height:1.35;color:rgb(17,24,39);font-weight:800',
  count: 'margin:0px;font-size:10px;color:rgb(148,163,184);white-space:nowrap',
  track:
    'padding:14px 12px 12px;border:1px solid rgb(229,231,235);border-radius:13px;' +
    'background:linear-gradient(rgb(255,255,255) 0%,rgb(248,250,252) 100%);' +
    'box-shadow:rgba(15,23,42,0.04) 0px 12px 30px;overflow-x:auto;white-space:nowrap;font-size:0px',
  step: 'display:inline-flex;vertical-align:middle;align-items:center',
  cell: 'display:inline-block;vertical-align:top;width:126px;white-space:normal;text-align:center',
  numWrap: 'display:flex;justify-content:center;margin-bottom:10px',
  num: (active: boolean, color: string) =>
    `display:inline-flex;align-items:center;justify-content:center;` +
    `width:34px;height:34px;border-radius:999px;` +
    `background:${active ? color : 'rgb(255,255,255)'};` +
    `color:${active ? 'rgb(255,255,255)' : 'rgb(17,24,39)'};` +
    `border:1px solid ${active ? color : 'rgb(219,227,238)'};` +
    'font-size:11px;font-weight:900;letter-spacing:1.2px;white-space:nowrap',
  label_: (active: boolean) =>
    'margin:0px;font-size:13px;line-height:1.55;' +
    `color:${active ? 'rgb(17,24,39)' : 'rgb(31,41,55)'};` +
    'font-weight:800;letter-spacing:0.05px;white-space:normal;word-break:break-all',
  line:
    'display:inline-block;vertical-align:middle;width:32px;height:1px;' +
    'line-height:1px;margin:0px 8px;' +
    'background:linear-gradient(90deg,rgba(148,163,184,0.35),rgba(148,163,184,0.85));' +
    'color:transparent;overflow:hidden',
}

// ── 组件定义 ──────────────────────────────────────────
export const ReadingPath_DA01 = {
  id: 'ReadingPath_DA01',
  name: '阅读路线',
  tag: 'reading-path',
  attrs: [],

  render(_attrs: Record<string, string>, _body: string, _t: ThemeColors, ..._rest: unknown[]): string {
    return ''
  },
}
