# r-markdown 同步评估报告

**日期**：2026-06-18
**同步来源**：origin/main (RobocopMao/r-markdown)，61 个新提交（v0.1.17 → v0.1.31）
**同步结果**：已合并到本地 `r-markdown/` 目录，merge 无冲突

---

## 一、变更概览

61 个提交可归为四大类：

| 类别 | 提交数 | 代表性功能 |
|---|---|---|
| Tauri 桌面客户端 | ~30 | 自动更新、签名验证、CI 构建、缩放设置 |
| 编辑器 UI 增强 | ~15 | 设置面板、行内样式按钮、组件选择器、深色模式适配 |
| 渲染引擎修复 | ~8 | 表格解析 bug 修复、Steps/Timeline 标签兼容性优化 |
| 基础设施 | ~8 | GitHub 图床、配置持久化、组件目录重组 |

---

## 二、渲染引擎差异逐项对比

### 2.1 markdownParser.ts — 表格解析 ✅ 已同步

r-markdown 修复了一个 bug：旧逻辑 `split('|').filter(Boolean)` 会把空单元格误删，导致列数错位。新逻辑改为先 `substring` 去掉首尾 `|` 再 `split`，保留中间空字符串。

**m2v 状态**：引擎已使用新逻辑（`substring + split`），无需改动。

### 2.2 Steps_DA02.ts — table → inline-block 布局 ⚠️ 建议合并

r-markdown 将竖向步骤流内部布局从 `<table><tr><td>` 改为 `<section style="display:inline-block">`。原因注释为："inline-block，兼容 html2canvas，避免 table 标签污染剪贴板"。

**影响**：
- html2canvas 对 table 布局有已知缺陷（border-collapse、cellspacing）
- 微信公众号编辑器粘贴时 `<table>` 容易被吞掉或重排
- `<section>` + inline-block 更安全，视觉效果等价

**m2v 状态**：仍使用 `<table><tr><td>` 布局。此外 r-markdown 新增了 `direction` 属性（horizontal/vertical），m2v 无此属性。

**建议**：合并布局改造。`direction` 属性可选合并。

### 2.3 Timeline_DA01.ts — `<p>` → `<section>` + 增强图片支持 ⚠️ 建议合并

r-markdown 做了两项改动：

**a) 标签替换**：时间线每个条目的日期/标题/描述从 `<p>` 改为 `<section>`。
- 微信公众号编辑器对 `<p>` 有默认样式覆盖，粘贴时可能丢失 inline style
- `<section>` 是语义中性标签，编辑器干预更少
- `<p>` 内不能嵌套 block 元素（HTML 规范禁止），`<section>` 无此限制

**b) 增强图片解析**：新增 `<img>` 自定义标签支持、`Fragment` 类型系统实现图文混排、通过 `Img_DA01.render()` 统一图片渲染。

**m2v 状态**：仍使用 `<p>` 标签，图片解析仅支持 `![alt](url)[w h]` 格式。

**建议**：标签替换应合并（兼容性改善）。增强图片解析可酌情合并——若 m2v 已有独立的 Img_DA01 组件则可复用其 render。

### 2.4 inlineFormat.ts — 新增 UI 配置数组 ℹ️ 可选参考

r-markdown 在文件头部新增了 `inlineFormatOptions` 常量数组，枚举了 13 种行内格式选项（渐变背景、柔光重点、胶囊文字等），供编辑器工具栏展示用。渲染函数本身无改动。

**m2v 状态**：无此配置数组。m2v 编辑器工具栏有自己的实现方式。

**建议**：不直接合并。若 m2v 编辑器需要行内格式快速插入功能，可参考此数据结构。

---

## 三、非引擎变更参考价值

以下变更不直接影响渲染引擎，但包含可借鉴的设计模式：

| 变更 | 参考价值 | 说明 |
|---|---|---|
| BaseDialog / ConfirmDialog 组件 | 低 | Vue 组件，m2v 用 React，但弹窗交互模式可参考 |
| SettingsDialog（Tab 布局设置面板） | 中 | 设置面板的分组逻辑和交互模式可参考 |
| configPersistence（配置持久化） | 低 | 基于 localStorage，m2v 已有 Zustand persist |
| githubUploader（GitHub 图床） | 低 | m2v 已有阿里云 OSS / 腾讯云 COS 上传 |
| 组件目录重组 | 低 | r-markdown 从扁平结构改为 views/editor/components/ 层级 |
| 行内样式按钮（选中文字快速添加语法） | 中 | 编辑器交互增强思路可参考 |

---

## 四、合并建议汇总

| 优先级 | 变更项 | 文件 | 工作量 | 理由 |
|---|---|---|---|---|
| **P0 ✅** | Steps_DA02 table→inline-block | `engine/editor-components/Steps_DA02.ts` | 小 | 公众号粘贴兼容 + html2canvas 兼容，视觉无差异 |
| **P0 ✅** | Timeline_DA01 p→section | `engine/editor-components/Timeline_DA01.ts` | 小 | 公众号粘贴兼容，HTML 规范合规 |
| **P1 ✅** | Timeline_DA01 增强图片解析 | `engine/editor-components/Timeline_DA01.ts` | 中 | Fragment 图文混排 + `<img>` 自定义标签 + Img_DA01 统一渲染 |
| **P2 ⏭️** | Steps_DA02 direction 属性 | `engine/editor-components/Steps_DA02.ts` | 小 | r-markdown 定义了属性但 render 未实现，跳过 |
| 跳过 | inlineFormatOptions 配置 | — | — | 纯 UI 配置，m2v 有自己的编辑器架构 |
| 跳过 | Tauri 客户端全部变更 | — | — | 桌面应用构建，与纯前端工作台无关 |
| 跳过 | GitHub 图床上传 | — | — | m2v 已有 OSS/COS 上传方案 |

---

## 五、实施建议

P0 项（标签兼容性优化）建议立即合并，改动小、收益明确、风险低。具体操作：

1. **Steps_DA02**：将 render 函数中的 `<table><tr><td>` 布局替换为 `<section style="display:inline-block">` 布局，保持所有样式属性不变。
2. **Timeline_DA01**：将 render 函数中三个 `<p>` 标签替换为 `<section>` 标签，保持所有内联样式不变。

P1 项（Timeline 增强图片）建议评估 Img_DA01 组件在 m2v 中的 render 接口兼容性后决定。
