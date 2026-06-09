# markdown2view

一个**纯前端、零后端**的「Markdown / HTML 多场景渲染与导出工作台」。把同一份内容渲染为面向不同受众的成品形态（长图文 / A4 正式文档 / 小红书卡片 / AI 生成的风格化 HTML），并一键复制或导出（标题 / 摘要 / 富文本 / 图片 / PDF）。

> 规划文档：[`docs/技术架构设计.md`](./docs/技术架构设计.md)、[`docs/技术路线图.md`](./docs/技术路线图.md)

## 功能进度

- [x] 长图文模式：左编辑 / 右预览、主题色切换、滚动联动
- [x] 标题 / 摘要解析与独立复制
- [x] 复制富文本（可粘贴到公众号等长图文编辑器）、复制 HTML 源码
- [x] 数学公式（KaTeX，`$...$` 行内 / `$$...$$` 块级）
- [x] 代码块高亮并自动换行
- [x] AI 排版指令：一键复制语法说明，或复制“指令 + 当前内容”发给外部 AI
- [x] HTML 可视化模式 + Prompt 指令库（iframe 预览 / PNG / PDF / 多页导出 / ZIP 打包）
- [x] A4 文档模式最小闭环（估算分页 / 页眉页脚 / 配置持久化 / 打印 PDF）
- [x] 小红书卡片模式闭环（封面图 / 发布文案 / N 张内容图 / PNG）
- [x] 社交卡片 DOM 实测分页与批量打包下载
- [ ] 自由画布指令持续精细化、导出链路浏览器级回归测试

## 技术栈

React 18 + Vite + TypeScript + Tailwind CSS v4 + Zustand + CodeMirror 6 + KaTeX。

## 环境要求

- **Node.js** ≥ 20（已在 Node 24 验证）
- **pnpm** ≥ 10（包管理器）

```bash
# 若未安装 pnpm
npm install -g pnpm
```

## 快速开始（开发测试环境）

```bash
# 1. 安装依赖（首次或依赖变更后）
pnpm install

# 2. 启动开发服务器（热更新），默认 http://localhost:5173
pnpm dev

# 3. 类型检查（静态校验，等价于 CI 里的 lint 关卡）
pnpm typecheck

# 4. 生产构建（先类型检查再打包到 dist/）
pnpm build

# 5. 本地预览生产构建产物
pnpm preview
```

> 说明：`package.json` 已配置 `pnpm.onlyBuiltDependencies: ["esbuild"]`，首次安装会自动允许 esbuild 运行构建脚本；若提示被拦截，执行 `pnpm rebuild esbuild` 即可。

## 目录结构

```
src/
├── engine/                # 框架无关渲染引擎（移植自 r-markdown）
│   ├── utils/             # markdownParser / inlineFormat / math(KaTeX) 等
│   ├── editor-components/ # title / steps / timeline 等自定义组件
│   └── composables/       # 主题数据与类型（框架无关）
├── components/
│   ├── editor/            # CodeMirror 6 编辑器封装
│   └── ui/                # 通用 UI（Toast 等）
├── modes/article/         # 长图文模式
├── modes/html/            # HTML 可视化模式
├── modes/card/            # 小红书图文卡片模式
├── modes/document/        # A4 文档模式
├── lib/                   # store(Zustand) / render / clipboard / aiGuide / useScrollSync
├── data/                  # 示例内容
├── App.tsx
└── main.tsx
```

## 开源参考与归属

| 项目                                                                              | 借鉴内容                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [r-markdown](https://github.com/RobocopMao/r-markdown)                            | 公众号渲染引擎、自定义语法组件、主题系统、富文本/图片复制                                                                                                                                                |
| [html-anything（nexu-io）](https://github.com/nexu-io/open-design)                | HTML iframe 沙箱容器、`iframeToBlob` 高清导图、Skill 设计哲学                                                                                                                                            |
| [awesome-design-md（VoltAgent）](https://github.com/VoltAgent/awesome-design-md)  | DESIGN.md 设计风格指令来源                                                                                                                                                                               |
| [guizang-ppt-skill（op7418 / 歸藏）](https://github.com/op7418/guizang-ppt-skill) | 自由画布中「电子杂志」「瑞士国际主义」的风格参考，以及网页 PPT 主题节奏、标准图片比例、版式校验、低性能兜底等经验启发。原项目采用 AGPL-3.0，本项目仅做设计经验与提示词层面的转译吸收，未并入其模板源码。 |

## License

MIT
