import { components, type ComponentDef } from '@engine'

// 生成「长图文排版 Markdown 语法指令」纯文本，供用户复制后发给其它 AI，
// 让 AI 在输出长图文内容时能正确使用本系统支持的扩展语法与组件。
//
// 块级组件部分由 components 元数据自动生成，新增/修改组件后指令会自动同步。

function renderAttrs(attrs: ComponentDef['attrs']): string {
  if (!attrs || attrs.length === 0) return '  （无属性）'
  return attrs
    .map((a) => {
      const req = a.required ? '【必填】' : '【可选】'
      const def = a.default ? `，默认：${a.default}` : ''
      const opts = a.options && a.options.length ? `，可选值：${a.options.join(' / ')}` : ''
      return `  - ${a.key} ${req} ${a.label}${def}${opts}`
    })
    .join('\n')
}

function renderComponents(): string {
  // 按 tag 分组（title/steps/compare/engage 有多种变体）
  const groups = new Map<string, ComponentDef[]>()
  for (const c of components) {
    const list = groups.get(c.tag) ?? []
    list.push(c)
    groups.set(c.tag, list)
  }

  const blocks: string[] = []
  let idx = 1
  for (const [tag, list] of groups) {
    const names = Array.from(new Set(list.map((c) => c.name))).join(' / ')
    const lines: string[] = []
    lines.push(`### ${idx}. <${tag}>  ${names}`)

    // 每个变体的示例
    list.forEach((c) => {
      const variant = list.length > 1 ? `（${c.id}）` : ''
      if (c.example) lines.push(`示例${variant}：\n${c.example}`)
    })

    // 合并所有变体的属性（按 key 去重）
    const attrMap = new Map<string, NonNullable<ComponentDef['attrs']>[number]>()
    list.forEach((c) => c.attrs?.forEach((a) => { if (!attrMap.has(a.key)) attrMap.set(a.key, a) }))
    lines.push('属性：')
    lines.push(renderAttrs(Array.from(attrMap.values())))

    blocks.push(lines.join('\n'))
    idx += 1
  }
  return blocks.join('\n\n')
}

const INLINE_SECTION = `## 二、行内强调语法（写在正文里）

- ==文字==        渐变背景强调（主题色）
- !!文字!!        胶囊标签背景（圆角药丸）
- ^^文字^^        靛青/主题色加重强调
- ::文字::        柔光主题色重点文字
- **文字**        粗体
- *文字*          斜体
- ***文字***      粗体 + 斜体
- __文字__        主题色下划线
- <u>文字</u>     普通下划线
- ~~文字~~        删除线
- ~文字~          下标（如 H~2~O）
- ^文字^          上标（如 m^2^）
- \`文字\`          行内代码`

const STANDARD_SECTION = `## 一、标准 Markdown

- 标题：# 一级 / ## 二级 / ### 三级 / #### 四级
- 无序列表用 - ，有序列表用 1. ；支持引用 > 、表格、分隔线
- 强制分页：使用 \\\`<page-break>\\\` 或 \\\`<page-break />\\\` （主要用于 A4 文档模式单独输出封面、目录或新章节页面）
- 任务列表：- [x] 已完成   - [ ] 未完成
- 代码块：用三个反引号包裹，必须标注语言，例如 \`\`\`javascript
  - 系统会自动做代码高亮和自动换行，不需要额外写 HTML 样式
- 图片：![描述](图片地址)
  - 限制尺寸：![描述](图片地址)[100% 250px]  （格式为 [宽度 高度]，可超出部分滚动）
- 图表题注自动居中与间距贴合：系统支持题注识别。如果是图片题注（如 \`图 1: xxxx\`），请写在**图片下方**；如果是表格题注（如 \`表 1: xxxx\`），请写在**表格上方**（支持图/表/Fig/Table/Figure + 数字/中文数字 + 冒号/点/空格）。系统将自动将其渲染为居中的小字置灰，并微调间距贴合图表。
- 多图横向并排（左右滑动）：< ![图1](地址1), ![图2](地址2), ![图3](地址3) >
- 脚注链接：[显示文字](链接地址 "脚注说明")  —— 带引号说明的链接会自动汇总到文末"参考资料"`

const META_SECTION = `## 输出结构（必须遵守）

请先输出文章元信息，再输出正文。推荐使用 YAML frontmatter：

---
title: 这里写适合平台展示的标题
summary: 这里写 50-120 字摘要，便于单独复制到平台简介/导语
---

正文从这里开始。

要求：
- title 必须是可直接发布的标题，不要超过 30 个汉字。
- summary 必须概括正文核心信息，不要写成宣传口号。
- 正文继续使用下面的扩展 Markdown 语法。
- 不要把整篇文章包在代码块里。`

const CALLOUT_SECTION = `## 三、提示框（Callout）

> [TIP] 这里是标题
> 这里是提示框正文内容

可用类型：[TIP] / [NOTE] / [WARNING] / [CAUTION] / [IMPORTANT]`

const MATH_SECTION = `## 五、数学公式（KaTeX）

- 行内公式：用单个美元符号包裹，例如 $E=mc^2$
- 块级公式（独占一行、居中显示）：用两个美元符号包裹，例如：
$$
\\int_0^1 x^2 \\,dx = \\frac{1}{3}
$$
- 公式语法遵循 LaTeX / KaTeX 规范。`

const RULES_SECTION = `## 六、使用规则（重要）

1. 只能使用上面列出的语法与标签，不要发明新标签或新属性。
2. 组件标签写法与普通 HTML 一致：<tag 属性="值">内容</tag> 或自闭合 <tag ...></tag>。
3. 绝大多数属性都是可选的，不确定时可以省略，会使用默认值。
4. 颜色值可用十六进制（如 #e74c3c）或预设名（如 red/green/yellow），留空则跟随全局主题色。
5. 标题、步骤流、对比、互动卡片存在多种样式变体，用 type 属性切换（如 type="DA02"）。
6. 直接输出可粘贴的 Markdown 正文，不要额外解释，不要用代码块把整篇文章包起来。
7. 合理搭配组件：开头可用 <title> 或 <breaking>，结尾可用 <engage>，正文穿插 <statement>、<steps>、<timeline> 等增强可读性。`

export function buildAiGuide(): string {
  return [
    '# 长图文排版 Markdown 语法指令',
    '',
    '你是一位长图文文章排版助手。请严格使用下面这套「扩展 Markdown 语法」来输出文章内容，',
    '这样内容可以被一键渲染为带样式的长图文，并按需复制标题、摘要、富文本或导出长图。',
    '',
    META_SECTION,
    '',
    STANDARD_SECTION,
    '',
    INLINE_SECTION,
    '',
    CALLOUT_SECTION,
    '',
    '## 四、块级组件（直接以标签形式写在正文中）',
    '',
    renderComponents(),
    '',
    MATH_SECTION,
    '',
    RULES_SECTION,
    '',
  ].join('\n')
}

export function buildCardAiGuide(platform: string, aspect: string): string {
  const platformName = '小红书'
  return [
    `# ${platformName}图文卡片 Markdown 生成指令`,
    '',
    `请把内容改写为适合 ${platformName} 发布的图文卡片稿，画布比例为 ${aspect}。`,
    '输出必须是 Markdown，不要把整篇包在代码块里。',
    '',
    '## 输出结构',
    '',
    '先输出 YAML frontmatter：',
    '',
    '---',
    'title: 适合作为封面大标题的标题，不超过 24 个汉字',
    'summary: 适合作为发布文案摘要的 50-120 字内容',
    'badge: 可选角标，例如 GUIDE / NOTE / 清单',
    'hook: 可选金句或行动提示',
    'chips: 话题1|话题2|话题3',
    'brand: 可选账号名',
    '---',
    '',
    '然后输出正文 Markdown。正文会被自动拆成 N 张内容图，系统会统一生成封面图、发布文案和内容图。',
    '',
    '## 排版规则',
    '',
    '- 使用短段落、清晰小标题和列表，每张图只承载一个重点。',
    '- 支持标准 Markdown、表格、引用、图片、数学公式，以及长图文模式里的扩展标签。',
    '- 代码块必须标注语言，例如 ```ts；系统会自动代码高亮并自动换行。',
    '- 不要直接输出 HTML 样式；需要强调时使用 ==重点==、!!标签!!、^^强强调^^ 等行内语法。',
    '- 不要额外解释，只输出可粘贴回编辑器的 Markdown。',
  ].join('\n')
}
