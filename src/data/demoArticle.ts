export const DEMO_ARTICLE = `<title type="DA02" badge="ARTICLE" subtitle="一份适合公众号长文排版的模块专属示例。" chips="公众号|长文|组件">markdown2view 公众号文章示例</title>

<reading-path></reading-path>

<lead>
这份示例用于展示公众号文章模式的排版能力：标题卡片、阅读路径、提示框、步骤流、对比卡片、标签徽章和结尾互动组件都可以直接复制到公众号编辑器。
</lead>

<p-title num="01" title="为什么需要多场景渲染" subtitle="ONE SOURCE · MULTI OUTPUT" level="1"></p-title>

内容团队常常需要把同一份素材改写成公众号文章、正式文档、社交媒体卡片和风格化网页。markdown2view 的目标，是让创作者先专注内容，再选择交付形态。

> [TIP] 你可以在左侧继续编辑 Markdown，右侧会实时预览公众号友好的富文本效果。

<p-title num="02" title="推荐工作流" subtitle="WORKFLOW" level="1"></p-title>

<steps label="HOW IT WORKS" title="从草稿到发布" hint="按顺序完成即可" active="2">
- 写作 | 在 Markdown 中完成主文案和结构
- 排版 | 通过标题、提示、对比、标签等组件增强表达
- 复制 | 一键复制富文本，粘贴到公众号后台继续发布
</steps>

<p-title num="03" title="组件风格展示" subtitle="COMPONENTS" level="1"></p-title>

<badges tone="accent">React|Vite|TypeScript|Tailwind</badges>

<compare left-label="BEFORE" left-title="手工排版" right-label="AFTER" right-title="模块化输出">
<left>
- 重复调整字号和间距
- 多平台样式难以统一
- 复制导出容易变形
</left>
<right>
- 组件化 Markdown 描述内容
- 按场景生成不同成品
- 导出链路可重复复用
</right>
</compare>

<statement>先把内容写清楚，再把表达交给模板。</statement>

<p-title num="04" title="代码与公式" subtitle="TECH NOTES" level="1"></p-title>

\`\`\`ts
const modes = ['article', 'document', 'card', 'html']

function render(mode: string, content: string) {
  return \`render \${mode} with \${content.length} chars\`
}
\`\`\`

行内公式示例：当 $a \\ne 0$ 时，二次方程可以写成 $ax^2 + bx + c = 0$。

<cta label="NEXT STEP" title="换到其他模式试试看" button="恢复当前模块示例"></cta>

<engage type="DA02" title="感谢阅读" subtitle="继续把同一份内容变成更多成品。" color="green"></engage>
`
