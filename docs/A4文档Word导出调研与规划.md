# A4 文档 Word 导出：调研结论与实施规划

> 本文档记录 A4 文档模式新增 Word（.docx）导出功能的技术调研结论和实施方案。
> 核心约束：纯前端、零后端、高保真样式。

## 1. 候选技术路线评估

### 1.1 路线一：PDF → Word（已否决）

思路是先走现有的 Paged.js + `window.print()` 通路导出 PDF，再将 PDF 转换为 .docx。

**调研结论：不可行。**

PDF 格式的本质是"画布"而非"文档"——内部以绝对坐标存储绘图命令，不保留段落、标题、表格等语义结构。从 PDF 反推 Word 需要在原始坐标数据之上重建完整的文档语义层，这是整个转换中 90% 的工作量所在。

开源生态现状：

- **高精度方案全部需要 Python + GPU**：MinerU（67.8k 星，VLM + OCR 双引擎）、Docling（61.7k 星，IBM 出品，MIT 协议）、Marker（36.2k 星，PyMuPDF + Surya）均为重量级后端服务，无法在浏览器中运行。
- **唯一浏览器端解析器 pdf.js**（53.5k 星，Mozilla）只能提取原始定位文本和字体元数据，不提供任何结构识别能力（不区分标题/段落、不检测表格、不推断阅读顺序）。
- **直接 PDF→DOCX 工具 pdf2docx**（3.4k 星）已停止维护（Artifex 已终止开发），且为 Python 实现。
- **没有成熟的 WASM 方案**将高精度 PDF 解析带入浏览器。

对本项目的特定问题：A4 文档通过 Paged.js + Chromium `print-to-PDF` 生成，虽然 Chromium 85+ 会嵌入基础结构标签（Tagged PDF），但 Paged.js 改变了默认布局，可能干扰结构推断；中文字体的 ToUnicode 映射也可能不完整。即便用最好的工具，从这种 PDF 反推 Word 也是在"先破坏再修复"，徒增信息损耗。

**结论：本项目已拥有完整的 Markdown 源码和结构化 DocumentBlock 模型，PDF→Word 路线等于先把语义信息"降级"为视觉坐标再"升级"回来，既违反项目零后端约束，又在技术上舍近求远。**

### 1.2 路线二：HTML → DOCX（AltChunk 包装）

思路是将渲染好的 HTML 直接打包为 .docx 的 AltChunk 块，依赖 Word 自身的 HTML 渲染引擎显示。

**调研结论：不推荐。**

- 唯一的 TS 实现 `html-docx-js-typescript`（113 星）已停更 6 年。
- AltChunk 方案的样式保真度取决于 Word 的 HTML 渲染引擎，对 CSS 变量、flex 布局、`@page` 规则的支持极差。
- 无法精确控制页面设置、页眉页脚、分页等核心需求。
- 产出的文档在不同版本的 Word 中表现不一致。

### 1.3 路线三：直接 OOXML 生成（采纳）

思路是从 Markdown / DocumentBlock 模型直接构建 OOXML（.docx），跳过所有中间格式。

**调研结论：采纳。** 这是信息无损的通路——项目已拥有完整的语义数据（标题层级、段落文本、表格结构、图片 URL、页面设置、字体、字号、页眉页脚），只需将其翻译为 Word 的格式声明即可。

核心依赖：`docx`（dolanmiu/docx），5.8k 星，周下载量 1060 万，纯 TypeScript，MIT 协议，完整的浏览器支持。声明式 API 与 DocumentBlock 模型天然契合。

### 1.4 JS/TS OOXML 生成库选型

| 库 | 星数 | 浏览器支持 | 维护状态 | 评估 |
|---|---|---|---|---|
| **docx**（dolanmiu） | 5.8k | 完整 | 活跃（v9.7） | **采纳。** 功能覆盖完整，API 与 DocumentBlock 模型契合 |
| docxtemplater | 3.6k | 完整 | 活跃 | 模板填充方案，图片/HTML 模块需付费（500 欧/年），不适合动态内容 |
| docx-templates | 适中 | 完整（ES2017） | 中等 | 同为模板方案，缺乏 sections/headers/footers/TOC 等高级功能 |
| officegen | 2.7k | **不支持** | 低维护 |  disqualified，无浏览器支持 |
| html-docx-js-typescript | 113 | 支持 | **已停更 6 年** | disqualified，AltChunk 方案保真度不足 |

`docx` 库的功能覆盖逐项确认：

| 项目需求 | docx 库支持 | 对应 API |
|---------|------------|---------|
| A4 页面尺寸 | 支持 | `convertMillimetersToTwip(210/297)` |
| 页边距（上/右/下/左） | 支持 | Section `page.margin`（twip） |
| 页眉（左/右分栏） | 支持 | Section `headers.default`，含多段落布局 |
| 页脚（页码） | 支持 | `PageNumber.CURRENT` / `PageNumber.TOTAL_PAGES` |
| 首页不同（封面页） | 支持 | `titlePage: true` + `headers.first` |
| 标题 h1-h3 | 支持 | `HeadingLevel.HEADING_1/2/3` |
| 正文段落（字号/行高/对齐） | 支持 | Paragraph `spacing`、`alignment`、TextRun `size` |
| 首行缩进 | 支持 | Paragraph `indent.firstLine`（twip） |
| 标题居中 | 支持 | Paragraph `alignment: CENTER` |
| 表格（边框/列宽/表头） | 支持 | `Table` + `tableLayoutType: FIXED` + `TableHeader` |
| 图片 | 支持 | `ImageRun`（base64 / ArrayBuffer） |
| 代码块 | 支持 | Paragraph + 等宽字体 + 背景色 |
| 引用块 | 支持 | Paragraph + 左侧边框 + 缩进 |
| 列表（有序/无序） | 支持 | Paragraph `numbering` |
| 分页符 | 支持 | `new PageBreak()` |
| 水平线 | 支持 | Paragraph `border.bottom` |
| 中文字体（宋体/仿宋/黑体） | 支持 | TextRun `font`（SimSun / FangSong / SimHei） |
| 三档字号缩放 | 支持 | TextRun `size`（half-point 单位） |
| 行高控制 | 支持 | Paragraph `spacing.line` |
| 目录（TOC） | 支持 | `TableOfContents`（Word 打开时自动更新） |

## 2. 数据流设计

```
Markdown 源码
    ↓ splitMarkdownBlocks()（已有）
DocumentBlock[]
    ↓ （新增）inline 格式解析
DocumentBlock[] + InlineNode[]
    ↓ （新增）docx 转换器
docx.Document
    ↓ Packer.toBlob()
.docx Blob → 触发下载
```

不经过 Paged.js、不经过 iframe、不经过 PDF。导出通路完全独立于现有的预览渲染管线。

## 3. 模块拆分与任务清单

### Task 1：安装依赖与基础骨架

安装 `docx` 库。新建 `src/lib/exportDocx.ts`，实现最小可运行版本：接收 `DocumentBlock[]` + `DocumentSettings`，输出 .docx Blob。在 `DocumentMode.tsx` 的工具栏中新增"导出 Word"按钮，调用 `useExportAction` 统一处理导出状态和 Toast 反馈。

成功标准：点击导出按钮能下载一个 .docx 文件，用 Word / WPS 打开后能看到纯文本内容、正确的页面尺寸和页边距。

### Task 2：页面设置映射

将 `DocumentSettings` 映射到 docx Section 属性：

| DocumentSettings 字段 | docx 映射 | 换算规则 |
|---|---|---|
| `pageWidth: 794px` | `page.size.width` | px → mm → twip：`794px ≈ 210mm = 11906 twip` |
| `pageHeight: 1123px` | `page.size.height` | `1123px ≈ 297mm = 16839 twip` |
| `marginTop: 64px` | `page.margin.top` | `64px × 15 = 960 twip` |
| `marginRight: 72px` | `page.margin.right` | `72px × 15 = 1080 twip` |
| `marginBottom: 64px` | `page.margin.bottom` | 同 marginTop |
| `marginLeft: 72px` | `page.margin.left` | 同 marginRight |

换算工具函数：`pxToTwip(px)` — 基于 96dpi 标准：`1inch = 96px = 1440twip`，故 `1px = 15 twip`。

成功标准：Word 打开后页面设置对话框中的纸张尺寸和页边距数值与 DocumentSettings 一致。

### Task 3：字体与字号映射

建立字体选项到 Word 字体名的映射表：

| `fontFamily` 选项 | CSS 字体栈（已有） | Word 字体名（新增） | Word 中文字体名 |
|---|---|---|---|
| `songti` | `'SimSun', '宋体', ...` | `SimSun` | `宋体` |
| `fangsong` | `'FangSong', '仿宋', ...` | `FangSong` | `仿宋` |
| `heiti` | `'PingFang SC', 'Microsoft YaHei', ...` | `Microsoft YaHei` | `微软雅黑` |

docx 库中设置中英文字体：`font: { eastAsia: '宋体', ascii: 'Times New Roman', hAnsi: 'Times New Roman' }`。

三档字号缩放映射（基于 `index.css` 中的 CSS 变量值，docx `size` 单位为 half-point，换算：`px × 0.75 × 2 = px × 1.5`）：

| 元素 | small (px → half-pt) | normal (px → half-pt) | large (px → half-pt) |
|------|------|--------|-------|
| 正文 | 13px → 20 | 15px → 23 | 17px → 26 |
| h1 | 22px → 33 | 26px → 39 | 30px → 45 |
| h2 | 18px → 27 | 20px → 30 | 23px → 35 |
| h3 | 16px → 24 | 17px → 26 | 19px → 29 |

注：换算后取整，实际实现中可用 `Math.round(px * 1.5)` 计算。

成功标准：三种字体和三档字号的组合导出的 Word 文档，视觉尺寸与 A4 预览一致。

### Task 4：文本块转换

实现各 DocumentBlock kind 到 docx Paragraph 的映射：

- **heading**：解析 `#`/`##`/`###` 确定层级，映射到 `HeadingLevel.HEADING_1/2/3`，应用对应的字号。如果 `settings.centerTitle` 为 `true` 且为 h1，额外设置居中对齐。
- **paragraph**：解析 Markdown inline 格式（`**bold**`、`*italic*`、`` `code` ``、`[link](url)`、`~~strike~~`）为 TextRun 数组。如果 `settings.indentParagraph` 为 `true`，设置 `indent.firstLine: 2em`（按当前字号换算为 twip）。默认两端对齐（`alignment: BOTH`）。
- **quote**：左侧边框（`border.left`）+ 左缩进 + 灰色背景（`shading`），字体设为斜体。
- **code**：等宽字体（`Consolas` / `Courier New`）+ 浅灰背景 + 左缩进。保持原始换行（`white-space: pre` 等效）。
- **list**：使用 docx 的 `numbering` 配置，有序列表和无序列表分别定义。支持嵌套层级。
- **rule**：底部边框的水平段落。
- **pagebreak**：`new PageBreak()`。

Inline 格式解析器需要新增一个轻量函数 `parseInlineToRuns(markdown: string): TextRun[]`，用正则逐层匹配 inline 元素并拆分为 TextRun。不需要完整的 AST，只需处理常用 inline 格式。

成功标准：包含所有块类型的示例文档导出后，在 Word 中各元素的层级、间距、对齐方式与 A4 预览视觉一致。

### Task 5：表格转换

将 Markdown 表格（已有 `parseTableMarkdown` 可复用）转换为 docx `Table`：

- 表头行映射为 `TableHeader`（跨页时自动重复表头）。
- 列宽按等分计算：`contentWidth / columnCount`，其中 `contentWidth = pageWidth - marginLeft - marginRight`。
- 边框样式：`borderStyle: SINGLE, size: 1, color: '9CA3AF'`（对应 Tailwind gray-400）。
- 表头行背景色：浅灰 `shading: { fill: 'F3F4F6' }`。
- 单元格内联格式：复用 Task 4 的 `parseInlineToRuns`。
- 必须显式设置 `tableLayoutType: TableLayoutType.FIXED`，否则 Word 会自动调整列宽。

成功标准：Markdown 表格导出后在 Word 中列宽均匀、边框完整、表头有背景色、跨页时表头自动重复。

### Task 6：图片嵌入

将 Markdown 图片 `![alt](url)` 转换为 docx `ImageRun`：

- fetch 图片 URL → ArrayBuffer → 构造 `ImageRun`。
- 目标宽度：`contentWidth`（不超出内容区），高度按宽高比等比缩放。
- 需要预读图片尺寸：优先从 Markdown 的 alt 文本或 HTML `<img>` 属性中获取宽高，否则 fetch 图片后用 `createImageBitmap` 读取原始尺寸。
- 跨域处理：图片 URL 如果是外部资源，fetch 可能遇到 CORS 限制。策略：先尝试 fetch，失败时在导出的文档中插入占位文本 `[图片: URL]` 并通过 Toast 提示用户。

成功标准：包含图片的文档导出后，图片在 Word 中正确显示且尺寸合理。

### Task 7：页眉页脚

从 `DocumentSettings` 映射到 docx Section 的 Header/Footer：

- **页眉**：`headerLeft` 左对齐 + `headerRight` 右对齐，通过单个段落内设置 tab stop 实现（`tabStops: [{ type: RIGHT, position: contentWidth }]`），分隔线用段落底部边框。
- **页脚**：解析 `footerText` 模板（如 `第 {page} / {total} 页`），将 `{page}` 替换为 `PageNumber.CURRENT`，`{total}` 替换为 `PageNumber.TOTAL_PAGES`，居中对齐。
- **封面页**：如果文档包含封面页（检测逻辑复用现有的 `isCover` 判断），设置 `titlePage: true`，封面页使用独立的 `headers.first` / `footers.first`（空白或不显示页码）。

成功标准：Word 文档中页眉左右分栏显示正确，页脚页码自动编号，封面页不显示页眉页脚。

### Task 8：集成测试与边界处理

- 空文档导出（只有标题或完全为空）。
- 超长文档（50+ 页）的性能表现。
- 特殊字符（Markdown 语法字符未转义、CJK 混合拉丁字符）。
- 图片加载失败的降级处理。
- 导出过程中的 loading 状态和错误提示（复用 `useExportAction`）。
- 动态 import `docx` 库，确保不影响首屏加载体积：`const { Document, Packer } = await import('docx')`。

成功标准：上述边界场景均不崩溃，用户能得到明确的反馈（成功 Toast 或错误提示）。

## 4. 已知风险与缓解策略

| 风险 | 影响 | 缓解策略 |
|---|---|---|
| docx 库包体积（~300-400KB min） | 首屏加载 | 动态 import，仅在用户触发导出时加载 |
| 中文字体跨平台渲染差异 | macOS Word 和 Windows Word 显示不一致 | 设置 eastAsia + ascii + hAnsi 三通道字体名；可选嵌入 TTF 字体文件（docx 库支持） |
| 表格列宽自动调整 | Word 覆盖预设列宽 | 强制 `tableLayoutType: FIXED` |
| 图片 CORS 限制 | 外部图片无法 fetch | fetch 失败时插入占位文本 + Toast 提示 |
| TOC 需要 Word 打开后更新 | 导出的 .docx 中目录为空 | 设置 `updateFields: true`，Word 打开时自动提示更新 |
| 列表编号重置 | 有序列表可能重新开始计数 | 使用统一的 numbering 配置实例 |

## 5. 实施顺序与验证节点

建议按以下顺序分阶段实施，每个阶段独立可验证：

```
阶段一（基础通路）  Task 1 + Task 2 + Task 3
验证: 导出空白/纯文本文档，页面设置和字体正确
  ↓
阶段二（内容转换）  Task 4 + Task 5
验证: 全块类型示例文档导出，表格/标题/段落/代码块样式正确
  ↓
阶段三（高级特性）  Task 6 + Task 7
验证: 图片正确嵌入，页眉页脚和页码正确，封面页处理正确
  ↓
阶段四（鲁棒性）    Task 8
验证: 边界场景测试通过，错误处理完善，包体积不影响首屏
```

## 6. 不在本次范围内

- **字体嵌入**：将 TTF 字体文件打包进 .docx 以确保跨平台渲染一致。技术上可行（docx 库支持），但会显著增大文件体积（单个中文字体 5-15MB），暂不纳入。
- **目录（TOC）生成**：docx 库支持 `TableOfContents`，但需要 Word 打开后手动更新字段。可作为后续增强功能。
- **脚注/尾注**：当前 DocumentBlock 模型不包含脚注概念，无需支持。
- **PDF 导出改用 docx 库**：现有的浏览器原生打印 PDF 方案已足够好（矢量文本、排版精准、体积小），无需替换。
- **模板填充方案**（docxtemplater）：适用于"预设计模板 + 填数据"场景，与本项目的"任意 Markdown → 文档"定位不符。
