# UI 设计系统落地实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将《界面风格评估.md》的 P0/P1 一致性硬伤与《界面风格探索.md》中零风险的质感项落地，使应用 chrome 统一到 DESIGN.md 定义的设计系统。

**Architecture:** 逐任务、手术刀式修改。先改基础设施（token、共享图标、PreviewToolbar 接口），再收口一致性（gray→slate、blue→accent、Emoji→SVG、focus 环、主题色板），最后做质感细节（柔影、等宽点缀）。每个任务独立可提交、可验证。

**Tech Stack:** React 18 + TypeScript + Tailwind CSS v4（`@import 'tailwindcss'`，无 tailwind.config，token 走 CSS 变量与 `@theme`）+ Zustand。

**前置文档（必读）：**
- `DESIGN.md` — 设计系统 single source of truth（本次落地依据）
- `docs/界面风格评估.md` — P0/P1 来源
- `docs/界面风格探索.md` — 质感项来源
- `docs/开发经验与偏好记录.md` §1 — 审美偏好与约束

**关键约束（贯穿全程）：**
- 🚫 **不动 `src/engine/**` 和 `src/data/**`**（demo*、designPrompts）。那里的 Emoji/字体/色彩是用户产出物的一部分，受独立排版规范约束，不在本次范围。
- 🚫 不做深色模式、毛玻璃、霓虹、夸张渐变、极致动效。
- ✅ 中性色统一 slate；强调色统一 `var(--accent)`；图标统一线性 SVG。
- ✅ 每个任务结束 `npm run typecheck` 必须 0 错误。

**验证方式说明：** 本计划为 CSS/样式改动，无单元测试可写。每个任务的「验证」= `npm run typecheck` 通过 + 视觉核对（`npm run dev` 后人工核对指定元素）。灰盒回归用 `npm run build` 兜底。

---

## File Structure（本计划涉及的文件）

**新建：**
- `src/components/ui/Icon.tsx` — 共享线性 SVG 图标库（统一图标来源，替代散落内联 SVG 与 Emoji）

**修改（基础设施）：**
- `src/index.css` — 增加 `@theme` 设计 token；phone-frame 柔投影

**修改（一致性收口）：**
- `src/components/layout/PreviewToolbar.tsx` — `icon?: string` → `icon?: ReactNode`
- `src/components/ui/Button.tsx` — 补 focus-visible 环
- `src/components/ui/Input.tsx` — 补 focus-visible 环
- `src/components/ui/Select.tsx` — 补 focus-visible 环
- `src/components/ui/Toast.tsx` — `bg-gray-900` → `bg-slate-800`
- `src/components/layout/AppHeader.tsx` — 主题色板选中态双层投影
- `src/components/layout/MobileDrawer.tsx` — 模式图标与功能图标 Emoji→SVG
- `src/components/layout/HeaderMoreMenu.tsx` — 功能图标 Emoji→SVG
- `src/components/layout/CustomPromptPopover.tsx` — 🛠️→SVG
- `src/components/editor/SettingsModal.tsx` — 📁☁️📦⚠️→SVG
- `src/components/editor/EditorToolbar.tsx` — 图片上传失败 alert→onToast
- `src/modes/document/DocumentMode.tsx` — 工具栏 Emoji→SVG、复选框 blue→accent、gray→slate、页码等宽
- `src/modes/article/ArticleMode.tsx` — gray→slate
- `src/modes/article/ArticlePreview.tsx` — 工具栏 Emoji→SVG、标题/摘要卡 gray→slate
- `src/modes/card/CardMode.tsx` — 工具栏 Emoji→SVG、gray→slate
- `src/modes/html/HtmlMode.tsx` — 工具栏 Emoji→SVG、gray→slate
- `src/modes/html/PromptLibrary.tsx` — 📚→SVG

---

## Task 1: 建立共享图标库 Icon.tsx

统一线性 SVG 图标来源，供后续 Emoji→SVG 任务复用。先建库，后续任务按需引用。

**Files:**
- Create: `src/components/ui/Icon.tsx`

- [ ] **Step 1: 创建 Icon.tsx**

创建 `src/components/ui/Icon.tsx`，内容如下。所有图标统一 `viewBox="0 0 24 24"`、`fill="none" stroke="currentColor"`、`strokeWidth={2}`、`strokeLinecap="round" strokeLinejoin="round"`，尺寸由外部 className 控制（默认 16×16）。

```tsx
import { type SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

// 复制 / 排版指令（魔法棒，对应原 ✨）
export function Sparkles({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 3l1.9 5.8L19.5 10l-5.6 1.2L12 17l-1.9-5.8L4.5 10l5.6-1.2L12 3z" />
      <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z" />
    </svg>
  )
}

// 下载 / 导出源码（对应原 💾）
export function Download({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

// 复制 / 剪贴板（对应原 📋）
export function Clipboard({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}

// 图片（对应原 🖼️）
export function Image({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

// 火箭 / 复制富文本（对应原 🚀）
export function Rocket({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

// 打印 / 导出 PDF（对应原 🖨️）
export function Printer({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

// 包 / 打包导出 ZIP（对应原 📦）
export function Package({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M16.5 9.4l-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

// 刷新 / 恢复示例（对应原 🔄）
export function RotateCcw({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

// 齿轮 / 设置（对应原 ⚙️）
export function Settings({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

// 帮助 / 问号（对应原 ❓）
export function HelpCircle({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

// 盾牌 / 隐私安全（对应原 🛡️）
export function Shield({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

// 工具 / 自定义指令（对应原 🛠️）
export function Wrench({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

// 书籍 / 书库（对应原 📚）
export function Book({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

// 文档（对应原 📄，移动端模式图标）
export function FileText({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

// 调色板（对应原 🎨，移动端模式图标）
export function Palette({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

// 云（对应原 ☁️，图床）
export function Cloud({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

// 警告三角（对应原 ⚠️）
export function AlertTriangle({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

// 硬盘 / 本地存储（对应原 📁 本地 IndexedDB）
export function HardDrive({ size = 16, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
      <line x1="10" y1="16" x2="10.01" y2="16" />
    </svg>
  )
}
```

- [ ] **Step 2: 验证类型**

Run: `npm run typecheck`
Expected: 0 errors（新文件独立，不影响现有代码）

- [ ] **Step 3: 提交**

```bash
git add src/components/ui/Icon.tsx
git commit -m "feat(ui): 新增共享线性图标库 Icon.tsx"
```

---

## Task 2: PreviewToolbar 接口支持 ReactNode 图标

为后续 Emoji→SVG 任务做接口准备。当前 `icon?: string` 只能塞 Emoji 字符串。

**Files:**
- Modify: `src/components/layout/PreviewToolbar.tsx`

- [ ] **Step 1: 修改接口与渲染**

将 `PreviewToolbar.tsx` 中：
- `ToolbarAction.icon` 类型从 `icon?: string` 改为 `icon?: ReactNode`
- 渲染处 `{action.icon && <span className="mr-1">{action.icon}</span>}` 中 `mr-1` 改为 `mr-1 flex items-center`，保证 SVG 与文字垂直居中

具体：把第 8 行
```tsx
  icon?: string
```
改为
```tsx
  icon?: ReactNode
```

把第 62 行
```tsx
            {action.icon && <span className="mr-1">{action.icon}</span>}
```
改为
```tsx
            {action.icon && <span className="mr-1 flex items-center">{action.icon}</span>}
```

- [ ] **Step 2: 验证类型**

Run: `npm run typecheck`
Expected: 0 errors（`string` 是 `ReactNode` 的子类型，现有 Emoji 字符串调用仍兼容）

- [ ] **Step 3: 提交**

```bash
git add src/components/layout/PreviewToolbar.tsx
git commit -m "refactor(ui): PreviewToolbar.icon 支持 ReactNode，为 SVG 图标准备"
```

---

## Task 3: 全局 token 与 focus 环（基础设施）

在 index.css 用 Tailwind v4 `@theme` 落地 DESIGN.md §2 的 token；给 Button/Input/Select 补 focus-visible 环；Toast gray→slate。

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Input.tsx`
- Modify: `src/components/ui/Select.tsx`
- Modify: `src/components/ui/Toast.tsx`

- [ ] **Step 1: index.css 增加 @theme token 与柔投影**

在 `src/index.css` 顶部 `@import 'tailwindcss';` 之后、`:root` 之前，插入 `@theme` 块，沉淀语义 token（Tailwind v4 会据此生成 `bg-surface` / `text-muted` 等可用类）：

```css
@theme {
  /* 语义中性色 token（对应 DESIGN.md §2.1） */
  --color-surface: #ffffff;          /* 表面-白：卡片、输入框 */
  --color-surface-subtle: #f8fafc;   /* 表面-浅：工具栏底、悬停 */
  --color-surface-muted: #f1f5f9;    /* 表面-灰：分栏背景、分段控件 */
  --color-border-default: #e2e8f0;   /* 边框 */
  --color-border-subtle: #f1f5f9;    /* 边框-浅 */
  --color-ink-strong: #1f2937;       /* 文字-强 */
  --color-ink: #475569;              /* 文字-中 */
  --color-ink-muted: #64748b;        /* 文字-弱 */
  --color-ink-faint: #94a3b8;        /* 文字-极弱 */

  /* 等宽字体栈（DESIGN.md §3.1 现代点缀） */
  --font-mono: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
}
```

然后把 `.phone-frame` 的单层投影改为多层柔投影（DESIGN.md §6）：

找到 index.css 中：
```css
.phone-frame {
  width: 100%;
  max-width: 700px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
```
把 `box-shadow` 行改为：
```css
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(15, 23, 42, 0.08);
```

- [ ] **Step 2: Button.tsx 补 focus-visible 环**

`src/components/ui/Button.tsx` 第 10 行 `baseStyles`，把：
```tsx
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
```
改为：
```tsx
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none'
```

- [ ] **Step 3: Input.tsx 补 focus-visible 环**

`src/components/ui/Input.tsx` 第 7 行 `baseStyles`，把：
```tsx
    const baseStyles = 'h-8 rounded-md border border-slate-200 bg-white px-2.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-[var(--accent)] disabled:bg-slate-50 disabled:opacity-50'
```
改为：
```tsx
    const baseStyles = 'h-8 rounded-md border border-slate-200 bg-white px-2.5 text-[13px] text-slate-700 outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 disabled:bg-slate-50 disabled:opacity-50'
```

- [ ] **Step 4: Select.tsx 补 focus-visible 环**

`src/components/ui/Select.tsx` 第 7 行 `baseStyles`，把：
```tsx
    const baseStyles = 'h-8 rounded-md border border-slate-200 bg-white px-2 py-0 text-[13px] text-slate-700 outline-none transition-colors focus:border-[var(--accent)] disabled:bg-slate-50 disabled:opacity-50'
```
改为：
```tsx
    const baseStyles = 'h-8 rounded-md border border-slate-200 bg-white px-2 py-0 text-[13px] text-slate-700 outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]/30 disabled:bg-slate-50 disabled:opacity-50'
```

- [ ] **Step 5: Toast.tsx gray→slate 统一色相**

`src/components/ui/Toast.tsx` 第 28 行，把：
```tsx
      <div className="rounded-lg bg-gray-900/90 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
```
改为：
```tsx
      <div className="rounded-lg bg-slate-800/90 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
```

- [ ] **Step 6: 验证**

Run: `npm run typecheck`
Expected: 0 errors

Run: `npm run build`
Expected: 构建成功，无 Tailwind/PostCSS 报错

- [ ] **Step 7: 提交**

```bash
git add src/index.css src/components/ui/Button.tsx src/components/ui/Input.tsx src/components/ui/Select.tsx src/components/ui/Toast.tsx
git commit -m "feat(ui): 设计 token 化 + focus 环 + Toast 色相统一"
```

---

## Task 4: gray → slate 全局统一色相

收口 DESIGN.md §2.1 与 §8 的核心约束：消除 gray/slate 混用。

**Files:**
- Modify: `src/modes/document/DocumentMode.tsx`
- Modify: `src/modes/article/ArticleMode.tsx`
- Modify: `src/modes/article/ArticlePreview.tsx`
- Modify: `src/modes/card/CardMode.tsx`
- Modify: `src/modes/html/HtmlMode.tsx`

> 已知 gray 出现点（来自 `git grep`）：
> - `Toast.tsx:28` → Task 3 已处理
> - `ArticleMode.tsx:37,62,74`、`CardMode.tsx:331,356`、`DocumentMode.tsx:212,237`、`HtmlMode.tsx:625,653`（均为 `bg-gray-200` 分栏背景 / `bg-gray-50` 预览底）
> - `ArticlePreview.tsx:146,160`（`text-gray-500 hover:bg-gray-100 hover:text-gray-700`）、`141,143,155`（标题/摘要卡的 `border-gray-200 text-gray-400/900/600`）

- [ ] **Step 1: DocumentMode gray→slate**

`src/modes/document/DocumentMode.tsx`：
- 第 212 行 `bg-gray-200` → `bg-slate-200`
- 第 237 行 `bg-gray-200` → `bg-slate-200`

- [ ] **Step 2: ArticleMode gray→slate**

`src/modes/article/ArticleMode.tsx`：
- 第 37 行 `bg-gray-200` → `bg-slate-200`
- 第 62 行 `bg-gray-200` → `bg-slate-200`
- 第 74 行 `bg-gray-50` → `bg-slate-50`

- [ ] **Step 3: ArticlePreview gray→slate**

`src/modes/article/ArticlePreview.tsx`（标题/摘要卡片，5 处）：
- 第 141 行 `border-gray-200` → `border-slate-200`
- 第 143 行 `text-gray-400` → `text-slate-400`
- 第 146 行 `text-gray-500 ... hover:bg-gray-100 hover:text-gray-700` → `text-slate-500 ... hover:bg-slate-100 hover:text-slate-700`
- 第 151 行 `text-gray-900` → `text-slate-900`
- 第 155 行 `border-gray-200` → `border-slate-200`
- 第 157 行 `text-gray-400` → `text-slate-400`
- 第 160 行 `text-gray-500 ... hover:bg-gray-100 hover:text-gray-700` → `text-slate-500 ... hover:bg-slate-100 hover:text-slate-700`
- 第 165 行 `text-gray-600` → `text-slate-600`

- [ ] **Step 4: CardMode gray→slate**

`src/modes/card/CardMode.tsx`：
- 第 331 行 `bg-gray-200` → `bg-slate-200`
- 第 356 行 `bg-gray-200` → `bg-slate-200`

- [ ] **Step 5: HtmlMode gray→slate**

`src/modes/html/HtmlMode.tsx`：
- 第 625 行 `bg-gray-200` → `bg-slate-200`
- 第 653 行 `bg-gray-200` → `bg-slate-200`

- [ ] **Step 6: 验证无残留 gray**

Run: `git grep -n -E "bg-gray|text-gray|border-gray" -- "src/**/*.tsx"`
Expected: 无输出（所有 chrome gray 已清除）。若仍有输出，确认其是否在 `src/engine/**` 或 `src/data/**`（不在本次范围，可忽略）。

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 7: 提交**

```bash
git add src/modes/document/DocumentMode.tsx src/modes/article/ArticleMode.tsx src/modes/article/ArticlePreview.tsx src/modes/card/CardMode.tsx src/modes/html/HtmlMode.tsx
git commit -m "style(ui): 中性色 gray→slate 全局统一"
```

---

## Task 5: 各 mode 工具栏 Emoji → SVG

收口 DESIGN.md §5.2 与评估 P0-2.1。用 Task 1 的 Icon 库替换四个 mode 工具栏的 Emoji icon。

**Files:**
- Modify: `src/modes/document/DocumentMode.tsx`
- Modify: `src/modes/article/ArticlePreview.tsx`
- Modify: `src/modes/card/CardMode.tsx`
- Modify: `src/modes/html/HtmlMode.tsx`

- [ ] **Step 1: DocumentMode 工具栏 Emoji→SVG**

`src/modes/document/DocumentMode.tsx`：
1. 顶部 import 区追加（与现有 import 合并）：
```tsx
import { Sparkles, Download, Printer } from '@/components/ui/Icon'
```
2. `toolbarActions` 中（约 118/131/138 行）：
   - `icon: '✨'` → `icon: <Sparkles size={14} />`
   - `icon: '💾'` → `icon: <Download size={14} />`
   - `icon: '🖨️'` → `icon: <Printer size={14} />`

- [ ] **Step 2: ArticlePreview 工具栏 Emoji→SVG**

`src/modes/article/ArticlePreview.tsx`：
1. 顶部 import 区追加：
```tsx
import { Sparkles, Download, Clipboard, Image, Rocket } from '@/components/ui/Icon'
```
2. `toolbarActions` 中（约 75/88/98/105/112 行）：
   - `icon: '✨'` → `icon: <Sparkles size={14} />`
   - `icon: '💾'` → `icon: <Download size={14} />`
   - `icon: '📋'` → `icon: <Clipboard size={14} />`
   - `icon: '🖼️'` → `icon: <Image size={14} />`
   - `icon: '🚀'` → `icon: <Rocket size={14} />`

- [ ] **Step 3: CardMode 工具栏 Emoji→SVG**

`src/modes/card/CardMode.tsx`：
1. 顶部 import 区追加：
```tsx
import { Sparkles, Download, Clipboard, Image, Package } from '@/components/ui/Icon'
```
2. `toolbarActions` 中（约 257/270/280/289/297 行）：
   - `icon: "✨"` → `icon: <Sparkles size={14} />`
   - `icon: '💾'` → `icon: <Download size={14} />`
   - `icon: "📋"` → `icon: <Clipboard size={14} />`
   - `icon: "🖼️"` → `icon: <Image size={14} />`
   - `icon: "📦"` → `icon: <Package size={14} />`

- [ ] **Step 4: HtmlMode 工具栏 Emoji→SVG**

`src/modes/html/HtmlMode.tsx`：该文件工具栏 action 较多（约 502/509/534/544/575/583/593/605/615 行），逐个替换：
1. 顶部 import 区追加（按实际用到的图标）：
```tsx
import { Image, RotateCcw, Book, Package, Download, Printer } from '@/components/ui/Icon'
```
   > ⚠️ HtmlMode 中 `📺`(播放)、`🖼️`(多处)、`📚`、`🔄`、`📦`、`💾`、`🖨️` 需逐一对照。播放图标用 `Image` 不合适——若 HtmlMode 有 `📺` 播放按钮，在 Icon.tsx 追加一个 `Play` 图标：
   ```tsx
   // 播放（对应原 📺）
   export function Play({ size = 16, ...p }: IconProps) {
     return (
       <svg {...base(size)} {...p}>
         <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
       </svg>
     )
   }
   ```
   并在 import 中加入 `Play`。
2. 替换所有 `icon: '...'` Emoji 为对应 `<Icon size={14} />`。映射表（按 Emoji → Icon 组件）：
   - `📺` → `<Play size={14} />`
   - `🔄` → `<RotateCcw size={14} />`
   - `📚` → `<Book size={14} />`
   - `🖼️` → `<Image size={14} />`
   - `📦` → `<Package size={14} />`
   - `💾` → `<Download size={14} />`
   - `🖨️` → `<Printer size={14} />`
   完成后用 Step 5 的 grep 命令确认 `src/modes/html/HtmlMode.tsx` 内无 Emoji 残留。

- [ ] **Step 5: 验证无残留 Emoji（chrome 范围）**

Run: `git grep -n -P "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" -- "src/components/**" "src/modes/**"`
Expected: 仅剩各 mode 中**尚未替换**的或属 `src/data/**`、`src/engine/**` 的（后者不在范围）。确认 `src/modes/**` 与 `src/components/**` 内已无工具栏 action 的 Emoji icon。

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 6: 提交**

```bash
git add src/components/ui/Icon.tsx src/modes/document/DocumentMode.tsx src/modes/article/ArticlePreview.tsx src/modes/card/CardMode.tsx src/modes/html/HtmlMode.tsx
git commit -m "style(ui): 四个模式工具栏 Emoji→线性 SVG 图标"
```

---

## Task 6: 布局组件 Emoji → SVG

收口顶栏菜单、移动抽屉、自定义指令、风格库的 Emoji。

**Files:**
- Modify: `src/components/layout/HeaderMoreMenu.tsx`
- Modify: `src/components/layout/MobileDrawer.tsx`
- Modify: `src/components/layout/CustomPromptPopover.tsx`
- Modify: `src/modes/html/PromptLibrary.tsx`

- [ ] **Step 1: HeaderMoreMenu Emoji→SVG**

`src/components/layout/HeaderMoreMenu.tsx`：
1. 顶部 import 追加：
```tsx
import { Rocket, Settings, RotateCcw } from '@/components/ui/Icon'
```
2. 菜单项中（约 60/71/82 行）：
   - `<span>🚀</span>` → `<Rocket size={14} />`
   - `<span>⚙️</span>` → `<Settings size={14} />`
   - `<span>🔄</span>` → `<RotateCcw size={14} />`

- [ ] **Step 2: MobileDrawer Emoji→SVG**

`src/components/layout/MobileDrawer.tsx`：
1. 顶部 import 追加：
```tsx
import { FileText, Book, Image, Palette, HelpCircle, Settings, RotateCcw, Shield } from '@/components/ui/Icon'
```
2. `MODES` 数组（39–44 行）`icon: string` 改为 `icon: ReactNode`，并把 Emoji 换成 SVG：
```tsx
const MODES: { key: RenderMode; label: string; icon: ReactNode }[] = [
  { key: 'document', label: 'A4 规范文档', icon: <FileText size={20} /> },
  { key: 'article', label: '长图文排版', icon: <Book size={20} /> },
  { key: 'card', label: '分页图文卡', icon: <Image size={20} /> },
  { key: 'html', label: '自由画布', icon: <Palette size={20} /> },
]
```
   import 处补 `ReactNode`：`import { useEffect, type ReactNode } from 'react'`
3. `DrawerButton` 的 `icon` prop 类型从 `string` 改 `ReactNode`，渲染处 `<span className="text-lg">{icon}</span>` 改为 `<span className="text-slate-500">{icon}</span>`（去掉 text-lg，SVG 自带尺寸）。
4. 四个 `DrawerButton` 调用（约 127/132/137/142 行）：
   - `icon="❓"` → `icon={<HelpCircle size={18} />}`
   - `icon="⚙️"` → `icon={<Settings size={18} />}`
   - `icon="🔄"` → `icon={<RotateCcw size={18} />}`
   - `icon="🛡️"` → `icon={<Shield size={18} />}`
5. 模式卡片渲染处 `<span className="text-[20px] mb-1.5">{m.icon}</span>`（约 114 行）改为 `<span className="mb-1.5 text-[var(--accent)]">{m.icon}</span>`（选中态由父级已处理颜色，此处仅尺寸；非选中色用 text-slate-500 亦可，保持简单用 currentColor 继承）。

- [ ] **Step 3: CustomPromptPopover Emoji→SVG**

`src/components/layout/CustomPromptPopover.tsx`：
1. 顶部 import 追加：
```tsx
import { Wrench } from '@/components/ui/Icon'
```
2. 第 71 行 `<span>🛠️ {UI_LABELS.promptLibrary.customTab}</span>` 改为：
```tsx
<span className="flex items-center gap-1.5"><Wrench size={14} /> {UI_LABELS.promptLibrary.customTab}</span>
```

- [ ] **Step 4: PromptLibrary Emoji→SVG**

`src/modes/html/PromptLibrary.tsx`：
1. 顶部 import 追加：
```tsx
import { Book } from '@/components/ui/Icon'
```
2. 第 139 行 `<div className="text-lg font-bold text-slate-900">📚 风格指令库</div>` 改为：
```tsx
<div className="flex items-center gap-2 text-lg font-bold text-slate-900"><Book size={18} /> 风格指令库</div>
```

- [ ] **Step 5: 验证**

Run: `git grep -n -P "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" -- "src/components/**" "src/modes/**"`
Expected: `src/modes/**` 与 `src/components/**` 内应无 Emoji 残留（移动抽屉底部文案「🛡️」见 Step 6 处理）。若 MobileDrawer 第 190 行仍有 `🛡️` 文案，替换为：删除该 Emoji 或换 `<Shield>` 内联。

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 6: 提交**

```bash
git add src/components/layout/HeaderMoreMenu.tsx src/components/layout/MobileDrawer.tsx src/components/layout/CustomPromptPopover.tsx src/modes/html/PromptLibrary.tsx
git commit -m "style(ui): 顶栏菜单/抽屉/指令库 Emoji→SVG"
```

---

## Task 7: SettingsModal Emoji → SVG

图床配置弹窗内多处功能性 Emoji（📁☁️📦⚠️）。

**Files:**
- Modify: `src/components/editor/SettingsModal.tsx`

- [ ] **Step 1: 替换 Emoji**

`src/components/editor/SettingsModal.tsx`：
1. 顶部 import 追加：
```tsx
import { HardDrive, Cloud, Package, AlertTriangle } from '@/components/ui/Icon'
```
2. 替换（保留文字，仅换图标，颜色用 currentColor 继承）：
   - 第 124 行 `📁 本地 IndexedDB 模式` → `<span className="inline-flex items-center gap-1.5"><HardDrive size={15} /> 本地 IndexedDB 模式</span>`
   - 第 136 行 `☁️ Sm.ms 免费图床` → `<span className="inline-flex items-center gap-1.5"><Cloud size={15} /> Sm.ms 免费图床</span>`
   - 第 155 行 `📦 阿里云对象存储 (OSS)` → `<span className="inline-flex items-center gap-1.5"><Package size={15} /> 阿里云对象存储 (OSS)</span>`
   - 第 180 行 `📦 腾讯云对象存储 (COS)` → `<span className="inline-flex items-center gap-1.5"><Package size={15} /> 腾讯云对象存储 (COS)</span>`
3. 第 205 行安全提示的 `⚠️`（在 `<span className="shrink-0 mt-0.5">⚠️</span>`）→ `<AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-600" />`
4. 第 128 行正文内的 `⚠️` 是叙述文字的一部分，保留为纯文本「注意」前缀或移除 Emoji——建议改为纯文本「注意：」（去掉 Emoji，保持叙述流畅）。

- [ ] **Step 2: 验证**

Run: `git grep -n -P "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" -- "src/components/editor/SettingsModal.tsx"`
Expected: 无输出（或仅剩你主动保留的叙述性 Emoji，确认其意图）

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 3: 提交**

```bash
git add src/components/editor/SettingsModal.tsx
git commit -m "style(ui): 图床设置弹窗 Emoji→SVG"
```

---

## Task 8: 复选框 blue → accent + 主题色板统一

收口评估 P0-2.2 与 P1-2.4。

**Files:**
- Modify: `src/modes/document/DocumentMode.tsx`
- Modify: `src/components/layout/AppHeader.tsx`

- [ ] **Step 1: DocumentMode 复选框跟随主题色**

`src/modes/document/DocumentMode.tsx` 第 192 与 200 行，两处 `<input type="checkbox" ... className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />`：

把 `text-blue-600 focus:ring-blue-500` 改为跟随主题色。两处均改为：
```tsx
          className="rounded border-slate-300 accent-[var(--accent)] cursor-pointer"
```
（用原生 `accent-color`，比 ring 方案更简洁且自动跟随主题）

- [ ] **Step 2: AppHeader 主题色板选中态双层投影**

`src/components/layout/AppHeader.tsx` 第 175–181 行，当前：
```tsx
                className="h-5 w-5 rounded-full border transition-transform hover:scale-110 cursor-pointer"
                style={{
                  background: t.accent,
                  borderColor: accent === t.accent ? '#111' : 'transparent',
                  outline: accent === t.accent ? '2px solid #1118' : 'none',
                }}
```
改为（对齐 MobileDrawer 既有正确写法）：
```tsx
                className="h-5 w-5 rounded-full transition-transform hover:scale-110 cursor-pointer"
                style={{
                  background: t.accent,
                  boxShadow: accent === t.accent
                    ? '0 0 0 2px #fff, 0 0 0 4px var(--accent)'
                    : 'none',
                }}
```
（去掉 `border` 类与 borderColor/outline，改用双层 box-shadow）

- [ ] **Step 3: 验证无残留 blue 强调**

Run: `git grep -n -E "text-blue|border-blue|ring-blue|bg-blue" -- "src/**/*.tsx"`
Expected: 无输出（chrome 内无 blue 强调残留；`src/data/**`、`src/engine/**` 若有属产物，不在范围）

Run: `npm run typecheck`
Expected: 0 errors

- [ ] **Step 4: 提交**

```bash
git add src/modes/document/DocumentMode.tsx src/components/layout/AppHeader.tsx
git commit -m "style(ui): 复选框跟随主题色 + 主题色板选中态统一双层投影"
```

---

## Task 9: 等宽数字点缀（现代点缀）

落地 DESIGN.md §3.1：页码、计数等用等宽字体。低风险现代点缀。

**Files:**
- Modify: `src/modes/document/DocumentMode.tsx`

- [ ] **Step 1: 页码状态用等宽字体**

`src/modes/document/DocumentMode.tsx` 第 204–207 行，状态文本：
```tsx
      <span className="text-[12px] text-slate-400 ml-1 shrink-0 flex items-center gap-1">
        {status === 'rendering' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
        {status === 'rendering' ? '分页中…' : status === 'done' ? `共 ${pageCount} 页` : ''}
      </span>
```
改为（页码数字等宽 + 指示点跟随主题色）：
```tsx
      <span className="text-[12px] text-slate-400 ml-1 shrink-0 flex items-center gap-1 font-mono">
        {status === 'rendering' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />}
        {status === 'rendering' ? '分页中…' : status === 'done' ? `共 ${pageCount} 页` : ''}
      </span>
```
（追加 `font-mono`；`bg-blue-400` → `bg-[var(--accent)]` 顺手收口一个漏网的 blue）

- [ ] **Step 2: 验证**

Run: `npm run typecheck`
Expected: 0 errors

视觉：A4 文档模式渲染完成后，「共 N 页」应呈等宽字体。

- [ ] **Step 3: 提交**

```bash
git add src/modes/document/DocumentMode.tsx
git commit -m "style(ui): 页码状态等宽字体点缀 + 指示点跟随主题色"
```

---

## Task 10: 图片上传 alert → Toast 统一反馈

收口评估 P2-2.8。EditorToolbar 当前用 `alert()`，改为透传 `onToast`。

**Files:**
- Modify: `src/components/editor/EditorToolbar.tsx`
- Modify: 各使用 EditorToolbar 的 mode（需确认 props 透传）

- [ ] **Step 1: EditorToolbar 接收 onToast**

`src/components/editor/EditorToolbar.tsx`：
1. 接口追加 `onToast?: (msg: string) => void`：
```tsx
interface EditorToolbarProps {
  view: EditorView | null
  mode?: 'article' | 'document' | 'card' | 'html'
  onToast?: (msg: string) => void
}
```
函数签名解构加入 `onToast`：
```tsx
export function EditorToolbar({ view, mode, onToast }: EditorToolbarProps) {
```
2. 第 44–49 行 `handleImageUpload` 的 catch 块，把：
```tsx
    } catch (err) {
      console.error(err)
      alert(`图片上传失败: ${err instanceof Error ? err.message : '未知错误'}`)
    } finally {
```
改为：
```tsx
    } catch (err) {
      console.error(err)
      const msg = `图片上传失败: ${err instanceof Error ? err.message : '未知错误'}`
      onToast ? onToast(msg) : alert(msg)
    } finally {
```
（保留 alert 兜底，防止有调用方未透传 onToast 时静默失败）

- [ ] **Step 2: 各 mode 透传 onToast**

检索 `EditorToolbar` 的调用处（`git grep -n "EditorToolbar" -- "src/**/*.tsx"`），在每个调用点补充 `onToast={onToast}`。已知 DocumentMode/ArticleMode/CardMode/HtmlMode 均持有 `onToast` prop。逐个添加。

示例（DocumentMode，需对照实际行号）：
```tsx
<EditorToolbar view={view} mode="document" onToast={onToast} />
```

> 若某 mode 的 EditorToolbar 调用在 CodeEditor 内部封装（非直接暴露），则改为在 CodeEditor props 透传——先 `git grep` 确认调用层级，按实际结构调整。

- [ ] **Step 3: 验证**

Run: `npm run typecheck`
Expected: 0 errors

Run: `npm run build`
Expected: 构建成功

- [ ] **Step 4: 提交**

```bash
git add src/components/editor/EditorToolbar.tsx src/modes/**/*.tsx
git commit -m "refactor(ui): 图片上传失败改用 Toast 反馈"
```

---

## Task 11: 收尾验证与文档同步

**Files:**
- Modify: `docs/开发经验与偏好记录.md`（追加 DESIGN.md 引用）

- [ ] **Step 1: 全量回归**

Run: `npm run typecheck`
Expected: 0 errors

Run: `npm run lint`
Expected: 0 errors（关注是否有新增 inline-style 告警——本次均为 className/CSS 改动，不应新增）

Run: `npm run build`
Expected: 构建成功，chunk 体积无异常增长（Icon.tsx 为纯 SVG，体积极小）

- [ ] **Step 2: 视觉回归清单（人工，npm run dev）**

逐项核对：
- [ ] 顶栏：主题色板选中态为清晰双层白+主题色环（无半透明黑描边）
- [ ] 四个模式切换：ModeTabs 正常
- [ ] A4 文档：工具栏图标为线性 SVG（无 Emoji）；复选框跟随主题色；页码等宽
- [ ] 长图文：工具栏 SVG；标题/摘要卡片 slate 色相（无 gray）
- [ ] 分页图文：工具栏 SVG
- [ ] 自由画布：工具栏 SVG；风格库标题 SVG
- [ ] 图床设置弹窗：各图床类型用 SVG 图标
- [ ] 移动端抽屉（窄屏触发）：模式卡片 SVG；功能按钮 SVG
- [ ] 顶栏更多菜单：SVG
- [ ] 切换主题色：所有强调元素（按钮/tab/复选框/页码点）同步变色
- [ ] 输入框 Tab 聚焦：可见 focus 环

- [ ] **Step 3: 更新偏好记录引用 DESIGN.md**

`docs/开发经验与偏好记录.md` §1「UI 审美偏好」段末追加一条：
```markdown
- **设计系统 single source of truth**：UI 视觉决策以项目根目录 `DESIGN.md` 为准（中性色 slate / 强调色 `var(--accent)` / 图标线性 SVG / 禁止 Emoji 作 UI 图标等）。做任何 UI 工作前先读 `DESIGN.md`，复用其中 token 与组件模式，不得擅自发明新的颜色/间距/圆角/字体值。
```

- [ ] **Step 4: 最终提交**

```bash
git add docs/开发经验与偏好记录.md
git commit -m "docs: 偏好记录引用 DESIGN.md 作为 UI 决策依据"
```

---

## 附：与源文档的对应关系（可审计）

| 任务 | 来源 | 优先级 |
|------|------|--------|
| Task 1–2 | 基础设施（探索 C2 token 化的前置） | — |
| Task 3 | 探索 C2(token) + A4(柔影) + 评估 P1-2.3(focus) | P1 |
| Task 4 | 评估 P1-2.5(gray→slate) | P1 |
| Task 5–7 | 评估 P0-2.1(Emoji→SVG) | P0 |
| Task 8 | 评估 P0-2.2(复选框) + P1-2.4(色板) | P0/P1 |
| Task 9 | 探索 B1(等宽点缀) | 质感 |
| Task 10 | 评估 P2-2.8(alert→Toast) | P2 |
| Task 11 | 收尾验证 | — |

**未纳入本计划（明确排除，避免范围蔓延）：**
- 探索 A1（衬线标题）：需先解决字体本地化，归入「项目优化审查报告」中文字体本地化项，不在此处。
- 探索 A2（暖化色相 slate→stone）：与 Task 4（先统一到 slate）方向相反，属未来可选的大方向调整，当前保持 slate。
- 探索 B3（微动效）/ B4（深色模式）：风险高/与定位冲突，已排除。
- 评估 P2-2.6(Button focus 环)：已在 Task 3 一并处理。
- 评估 P2-2.7（标题窄屏硬切过渡）：收益低，排除。
