# 自由画布风格库优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将自由画布风格库从“品牌/用途混排的大列表”优化为“先选输出类型，再选视觉气质”的清晰选择流程，同时合并重复、降级泛化模板、重写高风险老旧风格。

**Architecture:** 保留现有 `DESIGN_STYLES` 作为唯一数据源，但为每个风格补充结构化元数据：`outputType`、`visualTone`、`family`、`displayLevel`。`PromptLibrary` 改为两层筛选 UI；`CardMode` 增加一条轻量引导，提示标准分页图文之外可去自由画布深度定制。

**Tech Stack:** React 18 + Vite + TypeScript + Tailwind + Vitest。

---

## 成功标准

- 自由画布风格库先按“输出类型”筛选，再按“视觉气质”筛选。
- `PPT 演示文稿` 不再作为强推荐模板展示，而是降级为基础/通用模板。
- `终端赛博 / Supabase / 开发者大会` 归入同一个“开发者/代码”族，但仍保留不同用途：代码页、开源产品页、技术大会幻灯片。
- `Linear / AI 控制台 / 数据指挥舱 / 霓虹科技发布` 在文案上明确区分为：工具界面、AI 控制台、实时大屏、发布会。
- `terminal`、`workshop-canvas`、`startup-pitch`、`neon-tech-launch` 去掉“霓虹、玻璃、夸张渐变、Emoji、极致动效”等高风险词，改成克制、可导出的设计描述。
- 分页图文页面保留现有清晰上手路径，并增加“深度定制可去自由画布”的入口提示。
- `pnpm test` 通过；新增/调整测试覆盖元数据完整性和关键归类。

## 文件边界

- Modify: `src/data/designPrompts.ts`
  - 扩展 `DesignStyle` 类型。
  - 增加输出类型、视觉气质、风格族、展示层级的枚举常量。
  - 调整重复和老旧风格的描述与 prompt 文案。
- Modify: `src/data/designPrompts.test.ts`
  - 增加元数据完整性测试。
  - 增加重复项治理测试。
  - 增加高风险词汇回归测试。
- Modify: `src/modes/html/PromptLibrary.tsx`
  - 用两层筛选替代单纯按 `category` 分组展示。
  - 默认隐藏或弱化 `displayLevel: 'basic'` 的基础模板。
- Modify: `src/modes/card/CardMode.tsx`
  - 在分页图文工具栏或发布文案卡片附近增加轻量提示。
- Optional Modify: `docs/开发经验与偏好记录.md`
  - 记录自由画布风格库治理原则，避免后续继续追加同质化品牌皮肤。

---

### Task 1: 为风格库增加结构化元数据

**Files:**
- Modify: `src/data/designPrompts.ts`
- Test: `src/data/designPrompts.test.ts`

- [ ] **Step 1: 先写失败测试**

在 `src/data/designPrompts.test.ts` 增加：

```ts
it('requires every design style to declare selection metadata', () => {
  for (const style of DESIGN_STYLES) {
    expect(style.outputType).toBeTruthy()
    expect(style.visualTone).toBeTruthy()
    expect(style.family).toBeTruthy()
    expect(['primary', 'basic']).toContain(style.displayLevel)
  }
})

it('keeps known duplicate-prone styles in explicit families', () => {
  const byId = Object.fromEntries(DESIGN_STYLES.map((style) => [style.id, style]))

  expect(byId['terminal'].family).toBe('developer-code')
  expect(byId['supabase'].family).toBe('developer-code')
  expect(byId['developer-conf'].family).toBe('developer-code')

  expect(byId['linear'].family).toBe('product-tool')
  expect(byId['ai-console'].family).toBe('ai-console')
  expect(byId['data-command-center'].family).toBe('data-screen')
  expect(byId['neon-tech-launch'].family).toBe('launch-event')

  expect(byId['ppt-slide'].displayLevel).toBe('basic')
})
```

- [ ] **Step 2: 运行测试确认失败**

Run:

```powershell
pnpm test -- src/data/designPrompts.test.ts
```

Expected: FAIL，错误原因是 `outputType`、`visualTone`、`family`、`displayLevel` 尚不存在。

- [ ] **Step 3: 扩展类型和常量**

在 `src/data/designPrompts.ts` 的 `DesignStyle` 前加入：

```ts
export const OUTPUT_TYPES = [
  '幻灯片',
  '长页',
  '卡片',
  '报告',
  '仪表盘',
  '文档',
] as const

export const VISUAL_TONES = [
  '极简',
  '编辑',
  '科技',
  '数据',
  '温暖',
  '代码',
] as const

export type OutputType = (typeof OUTPUT_TYPES)[number]
export type VisualTone = (typeof VISUAL_TONES)[number]
export type DisplayLevel = 'primary' | 'basic'
```

将 `DesignStyle` 扩展为：

```ts
export interface DesignStyle {
  id: string
  name: string
  category: string
  accent: string
  description: string
  outputType: OutputType
  visualTone: VisualTone
  family: string
  displayLevel: DisplayLevel
  style: string
}
```

- [ ] **Step 4: 给每个风格补齐元数据**

按以下规则补齐，不改变数组顺序：

```ts
// 示例：基础幻灯片降级
{
  id: 'ppt-slide',
  name: '基础幻灯片',
  category: '演示汇报/基础幻灯',
  accent: '#2563eb',
  description: '通用 16:9 横版幻灯片，适合作为空白起点',
  outputType: '幻灯片',
  visualTone: '极简',
  family: 'presentation-basic',
  displayLevel: 'basic',
  style: `...`
}
```

关键归类必须如下：

```ts
// developer-code family
terminal: { outputType: '长页', visualTone: '代码', family: 'developer-code', displayLevel: 'primary' }
supabase: { outputType: '长页', visualTone: '代码', family: 'developer-code', displayLevel: 'primary' }
developer-conf: { outputType: '幻灯片', visualTone: '代码', family: 'developer-code', displayLevel: 'primary' }

// 明确区分四个科技深色方向
linear: { outputType: '长页', visualTone: '科技', family: 'product-tool', displayLevel: 'primary' }
ai-console: { outputType: '仪表盘', visualTone: '科技', family: 'ai-console', displayLevel: 'primary' }
data-command-center: { outputType: '仪表盘', visualTone: '数据', family: 'data-screen', displayLevel: 'primary' }
neon-tech-launch: { outputType: '幻灯片', visualTone: '科技', family: 'launch-event', displayLevel: 'primary' }

// 小红书两者都保留，但定位不同
xiaohongshu: { outputType: '卡片', visualTone: '温暖', family: 'social-card-custom', displayLevel: 'primary' }
xhs-multipage: { outputType: '卡片', visualTone: '温暖', family: 'social-card-multipage', displayLevel: 'primary' }
```

- [ ] **Step 5: 运行测试确认通过**

Run:

```powershell
pnpm test -- src/data/designPrompts.test.ts
```

Expected: PASS。

---

### Task 2: 重写重复与老旧风格文案

**Files:**
- Modify: `src/data/designPrompts.ts`
- Test: `src/data/designPrompts.test.ts`

- [ ] **Step 1: 写高风险词汇测试**

在 `src/data/designPrompts.test.ts` 增加：

```ts
it('keeps rewritten styles away from dated high-risk visual tropes', () => {
  const rewrittenIds = new Set([
    'terminal',
    'workshop-canvas',
    'startup-pitch',
    'neon-tech-launch',
  ])
  const highRiskWords = ['霓虹', '毛玻璃', '拟物玻璃', '夸张渐变', 'Emoji', '极致动效']

  for (const style of DESIGN_STYLES.filter((item) => rewrittenIds.has(item.id))) {
    for (const word of highRiskWords) {
      expect(`${style.name}\n${style.description}\n${style.style}`).not.toContain(word)
    }
  }
})
```

- [ ] **Step 2: 运行测试确认失败**

Run:

```powershell
pnpm test -- src/data/designPrompts.test.ts
```

Expected: FAIL，至少 `terminal`、`startup-pitch`、`neon-tech-launch` 命中高风险词。

- [ ] **Step 3: 重写 `terminal`**

目标：从“终端赛博”改为“开发者文档/代码工作台”，减少模板化终端窗口和发光词。

建议替换：

```ts
name: '开发者代码 · Terminal',
description: '等宽字体、命令片段、API 示例和调试信息清晰排布',
style: `【视觉主题】开发者代码工作台，清晰、克制、可信
【色彩系统】
 - 基础底色：深灰 #0f1115 或冷白 #f8fafc，按内容密度选择。
 - 文本颜色：主文本高对比，注释与辅助信息使用中性灰。
 - 强调色：青绿 #22c55e 或蓝 #38bdf8，仅用于命令提示、状态和关键参数。
【排版规则】
 - 字体：代码、命令、参数使用 JetBrains Mono / Fira Code；说明文字使用现代无衬线体。
 - 层级：先给结论，再给命令、输出、解释，避免满屏代码。
【组件特征】
 - 代码块：带标题、语言标签、行号或输出区，边框清晰，不使用发光装饰。
 - 信息块：API 请求、响应、环境变量、错误提示分别用稳定区块表达。
【布局原则】适合 CLI 教程、SDK 说明、调试记录、技术方案附录；重点是可读和可复制。`
```

- [ ] **Step 4: 重写 `startup-pitch`**

目标：保留年轻路演，但去掉高饱和渐变依赖。

建议替换：

```ts
description: '年轻清爽的 Pitch Deck，故事线、市场机会和产品证据突出',
style: `【视觉主题】年轻创业团队路演，清爽、有冲劲、但仍然可信
【色彩系统】
 - 基础底色：亮白 #ffffff 或深紫灰 #171329。
 - 强调色：玫红 #ff4d8d、靛紫 #8b5cf6、亮青 #22d3ee，单页最多使用两种。
 - 文本颜色：深色背景用 #ffffff / #cbd5e1，浅色背景用 #111827 / #4b5563。
【排版规则】
 - 字体：现代圆润无衬线体，标题短促有力，正文用证据支撑。
 - 单页限制：每页只讲一个路演问题，如痛点、方案、市场、商业模式、增长、团队。
【组件特征】
 - 每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 可使用大号数字、机会卡片、增长曲线、产品 mockup 框、投资亮点标签。
【布局原则】适合融资 BP、Demo Day、创新项目汇报；视觉年轻，但信息结构必须稳。`
```

- [ ] **Step 5: 重写 `neon-tech-launch`**

目标：改名为“科技产品发布”，减少“霓虹”和随机光效。

建议替换：

```ts
name: '科技产品发布',
description: '高科技发布会风，深色舞台、产品能力、规格参数和路线图清晰',
style: `【视觉主题】高科技产品发布会，未来感来自结构、节奏和产品中心
【色彩系统】
 - 基础底色：深黑蓝 #050816 或 #08111f。
 - 强调色：电青 #00e5ff、冷蓝 #3b82f6、克制紫 #8b5cf6。
 - 边框与高光：使用细描边和局部高光，禁止大面积刺眼光晕。
【排版规则】
 - 字体：几何无衬线体；参数、版本号、规格值使用等宽字体。
 - 层级：产品名最大，能力模块次之，参数说明必须清晰可读。
【组件特征】
 - 每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：能力芯片、规格矩阵、产品框线、版本路线图可用 HTML/CSS 绘制。
【布局原则】适合 AI、新硬件、SaaS 新功能发布；发布感来自清楚的节奏，不靠随机装饰。`
```

- [ ] **Step 6: 重写 `workshop-canvas`**

目标：保留工作坊用途，避免儿童化便利贴堆叠。

建议替换：

```ts
description: '工作坊引导风，议程、分组任务、讨论模板和产出看板轻松但有秩序',
style: `【视觉主题】团队共创工作坊，开放、轻松、适合讨论和协作
【色彩系统】
 - 基础底色：暖白 #fffbeb 或浅灰 #f8fafc。
 - 强调色：黄 #eab308、湖蓝 #06b6d4、珊瑚红 #fb7185，作为标签和分组识别。
 - 文本颜色：主文本 #1f2937，辅助文本 #64748b。
【排版规则】
 - 字体：圆润无衬线体，标题友好但不幼稚。
 - 结构：目标 / 议程 / 分组任务 / 讨论模板 / 投票规则 / 输出物。
【组件特征】
 - 每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：分组任务卡、计时器、讨论看板、投票点、问题引导卡、成果模板。
【布局原则】适合工作坊、头脑风暴、需求共创、复盘会；轻松但必须整齐可执行。`
```

- [ ] **Step 7: 运行测试**

Run:

```powershell
pnpm test -- src/data/designPrompts.test.ts
```

Expected: PASS。

---

### Task 3: 将 PromptLibrary 改为两层筛选

**Files:**
- Modify: `src/modes/html/PromptLibrary.tsx`
- Test: `src/data/designPrompts.test.ts`

- [ ] **Step 1: 增加展示顺序测试**

在 `src/data/designPrompts.test.ts` 增加：

```ts
it('exports output types and visual tones used by the prompt library', async () => {
  const mod = await import('./designPrompts')

  expect(mod.OUTPUT_TYPES).toEqual(['幻灯片', '长页', '卡片', '报告', '仪表盘', '文档'])
  expect(mod.VISUAL_TONES).toEqual(['极简', '编辑', '科技', '数据', '温暖', '代码'])
})
```

- [ ] **Step 2: 更新导入和状态**

将 `PromptLibrary.tsx` 顶部改为：

```tsx
import { useMemo, useState } from 'react'
import {
  DESIGN_STYLES,
  OUTPUT_TYPES,
  VISUAL_TONES,
  type DesignStyle,
  type OutputType,
  type VisualTone,
} from '@/data/designPrompts'
```

在组件内增加：

```tsx
const [outputType, setOutputType] = useState<OutputType>('幻灯片')
const [visualTone, setVisualTone] = useState<VisualTone | '全部'>('全部')
const [showBasic, setShowBasic] = useState(false)
```

- [ ] **Step 3: 替换分组计算逻辑**

将当前 `groupedStyles` 替换为：

```tsx
const filteredStyles = useMemo(() => {
  return DESIGN_STYLES.filter((style) => {
    if (style.outputType !== outputType) return false
    if (visualTone !== '全部' && style.visualTone !== visualTone) return false
    if (!showBasic && style.displayLevel === 'basic') return false
    return true
  })
}, [outputType, visualTone, showBasic])

const groupedStyles = useMemo(() => {
  const groups: Record<string, typeof DESIGN_STYLES> = {}
  filteredStyles.forEach((style) => {
    if (!groups[style.visualTone]) groups[style.visualTone] = []
    groups[style.visualTone].push(style)
  })
  return Object.entries(groups).sort(
    (a, b) => VISUAL_TONES.indexOf(a[0] as VisualTone) - VISUAL_TONES.indexOf(b[0] as VisualTone),
  )
}, [filteredStyles])
```

- [ ] **Step 4: 在标题下方增加两层筛选 UI**

在 header 后、列表前增加：

```tsx
<div className="border-b border-slate-200 bg-white px-6 py-4">
  <div className="mb-3 text-xs font-semibold text-slate-400">先选输出类型</div>
  <div className="flex flex-wrap gap-2">
    {OUTPUT_TYPES.map((item) => (
      <button
        key={item}
        onClick={() => setOutputType(item)}
        className={`rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
          outputType === item
            ? 'bg-slate-900 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        {item}
      </button>
    ))}
  </div>

  <div className="mt-4 mb-3 text-xs font-semibold text-slate-400">再选视觉气质</div>
  <div className="flex flex-wrap items-center gap-2">
    {(['全部', ...VISUAL_TONES] as const).map((item) => (
      <button
        key={item}
        onClick={() => setVisualTone(item)}
        className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
          visualTone === item
            ? 'bg-[var(--accent)] text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        {item}
      </button>
    ))}
    <label className="ml-auto flex items-center gap-2 text-[13px] text-slate-500">
      <input
        type="checkbox"
        checked={showBasic}
        onChange={(event) => setShowBasic(event.target.checked)}
      />
      显示基础模板
    </label>
  </div>
</div>
```

- [ ] **Step 5: 列表空态**

在 `groupedStyles.map` 前增加：

```tsx
{groupedStyles.length === 0 ? (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
    当前组合下没有推荐风格，可以切换视觉气质，或勾选显示基础模板。
  </div>
) : null}
```

- [ ] **Step 6: 运行测试和类型检查**

Run:

```powershell
pnpm test -- src/data/designPrompts.test.ts
pnpm tsc --noEmit
```

Expected: 两条命令均 PASS。

---

### Task 4: 在分页图文页面增加自由画布深度使用提示

**Files:**
- Modify: `src/modes/card/CardMode.tsx`

- [ ] **Step 1: 在发布文案卡片下方增加提示**

在 `发布文案` 的 `aside` 后面增加：

```tsx
<aside className="mx-auto w-full max-w-[480px] rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-[13px] leading-6 text-blue-800">
  当前分页图文适合快速生成清晰、统一的多页卡片；如果需要更强的品牌风格、复杂版式或活动海报，可以切换到自由画布使用“小红书多页图文”风格深度生成。
</aside>
```

- [ ] **Step 2: 人工检查页面密度**

Run:

```powershell
pnpm dev
```

Expected: 开发服务器启动成功。

手动打开分页图文模式，检查：

- 提示没有挤压卡片预览。
- 提示语没有让用户误解“分页图文”被废弃。
- 移动到自由画布的表达是增强路径，不是替代路径。

---

### Task 5: 记录风格库治理原则

**Files:**
- Modify: `docs/开发经验与偏好记录.md`

- [ ] **Step 1: 增加一小节**

在 `## 1. 用户偏好与设计准则` 末尾增加：

```md
- **自由画布风格库治理**：
  - 风格库按“输出类型（幻灯片/长页/卡片/报告/仪表盘/文档）→ 视觉气质（极简/编辑/科技/数据/温暖/代码）”组织，避免品牌名和交付物类型混排。
  - 新增风格前先检查是否能归入既有 `family`；除非能明显覆盖新场景，否则不要新增同质化品牌皮肤。
  - 避免“霓虹、毛玻璃、夸张渐变、Emoji、极致动效”等容易导致土味或导出不稳定的表达。
  - 保留分页图文的低门槛路径；自由画布中的多页图文用于复杂品牌风格和深度定制。
```

- [ ] **Step 2: 文档检查**

Run:

```powershell
rg -n "自由画布风格库治理|霓虹|毛玻璃|极致动效" docs\\开发经验与偏好记录.md src\\data\\designPrompts.ts
```

Expected: 高风险词只应出现在治理说明或未纳入重写范围的历史风格里；`terminal`、`workshop-canvas`、`startup-pitch`、`neon-tech-launch` 不应命中。

---

## 推荐执行顺序

1. Task 1：先补齐元数据，让后续 UI 能稳定筛选。
2. Task 2：重写风格文案，降低重复感和土味风险。
3. Task 3：改 PromptLibrary，两层选择才真正解决用户感知问题。
4. Task 4：补分页图文到自由画布的增强路径。
5. Task 5：记录治理原则，防止后续继续膨胀。

## 验证命令

```powershell
pnpm test
pnpm tsc --noEmit
pnpm dev
```

最终人工验收：

- 打开自由画布风格指令库，第一眼看到的是“输出类型”，不是一长串品牌卡片。
- 默认列表中不突出 `基础幻灯片`。
- 搜索/浏览时能看出 `工具界面`、`控制台`、`大屏`、`发布会`的差异。
- 分页图文页面仍然显得简单好上手，并把自由画布表达为进阶能力。
