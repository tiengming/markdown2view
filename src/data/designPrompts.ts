// Prompt 指令库：精选设计风格 prompt。
// 工作流：用户复制某个风格指令 → 连同自己的内容发给外部 AI → AI 产出完整 HTML →
// 粘贴回「HTML 可视化模式」沙箱渲染 → 导出 PNG/PDF。
// 风格灵感来自 awesome-design-md 与 html-anything 架构。

export interface DesignStyle {
  id: string;
  name: string;
  category: string;
  accent: string;
  description: string;
  outputType: OutputType;
  visualTone: VisualTone;
  family: string;
  displayLevel: DisplayLevel;
  style: string;
  /** 可选的微型 HTML 预览片段，用于缩略图展示 */
  previewHtml?: string;
}

export const OUTPUT_TYPES = [
  "幻灯片",
  "长页",
  "卡片",
  "报告",
  "仪表盘",
  "文档",
] as const;

export const VISUAL_TONES = [
  "极简",
  "编辑",
  "科技",
  "数据",
  "温暖",
  "代码",
] as const;

export type OutputType = (typeof OUTPUT_TYPES)[number];
export type VisualTone = (typeof VISUAL_TONES)[number];
export type DisplayLevel = "primary" | "basic";

type DesignStyleMetadata = Pick<
  DesignStyle,
  "outputType" | "visualTone" | "family" | "displayLevel"
>;
type RawDesignStyle = Omit<DesignStyle, keyof DesignStyleMetadata>;

const meta = (
  outputType: OutputType,
  visualTone: VisualTone,
  family: string,
  displayLevel: DisplayLevel = "primary",
): DesignStyleMetadata => ({ outputType, visualTone, family, displayLevel });

const STYLE_METADATA: Record<string, DesignStyleMetadata> = {
  vercel: meta("长页", "极简", "minimal-product"),
  stripe: meta("长页", "科技", "fintech-product"),
  linear: meta("长页", "科技", "product-tool"),
  apple: meta("长页", "极简", "brand-story"),
  spotify: meta("长页", "编辑", "media-entertainment"),
  editorial: meta("长页", "编辑", "editorial-magazine"),
  terminal: meta("长页", "代码", "developer-code"),
  xiaohongshu: meta("卡片", "温暖", "social-card-custom"),
  notion: meta("文档", "温暖", "knowledge-doc"),
  "xhs-multipage": meta("卡片", "温暖", "social-card-multipage"),
  "ppt-slide": meta("幻灯片", "极简", "presentation-basic", "basic"),
  dashboard: meta("仪表盘", "数据", "business-dashboard"),
  resume: meta("文档", "极简", "resume-profile"),
  claude: meta("长页", "温暖", "ai-assistant"),
  figma: meta("长页", "科技", "design-tool"),
  airbnb: meta("长页", "温暖", "consumer-brand"),
  supabase: meta("长页", "代码", "developer-code"),
  raycast: meta("长页", "科技", "system-tool"),
  mongodb: meta("长页", "科技", "enterprise-data"),
  framer: meta("长页", "科技", "site-builder"),
  github: meta("长页", "代码", "developer-code"),
  openai: meta("长页", "极简", "frontier-ai"),
  arc: meta("长页", "温暖", "system-experience"),
  discord: meta("长页", "科技", "community-chat"),
  tailwind: meta("长页", "极简", "web-components"),
  report: meta("报告", "编辑", "annual-report"),
  poster: meta("卡片", "编辑", "poster-design"),
  "ai-console": meta("仪表盘", "科技", "ai-console"),
  "blueprint-tech": meta("长页", "科技", "blueprint-tech"),
  "keynote-cinematic": meta("幻灯片", "编辑", "keynote-cinematic"),
  "consulting-deck": meta("幻灯片", "数据", "consulting-deck"),
  "startup-pitch": meta("幻灯片", "温暖", "startup-pitch"),
  "neon-tech-launch": meta("幻灯片", "科技", "launch-event"),
  "growth-review": meta("幻灯片", "数据", "growth-review"),
  "developer-conf": meta("幻灯片", "代码", "developer-code"),
  "project-kickoff-rally": meta("幻灯片", "温暖", "project-kickoff"),
  "roadmap-planning": meta("幻灯片", "数据", "roadmap-planning"),
  "project-retro": meta("幻灯片", "数据", "project-retro"),
  "annual-story-review": meta("幻灯片", "温暖", "annual-story"),
  "proposal-lab": meta("幻灯片", "科技", "proposal-lab"),
  "workshop-canvas": meta("幻灯片", "温暖", "workshop-canvas"),
  "editorial-ink-deck": meta("幻灯片", "编辑", "editorial-ink-deck"),
  "swiss-presentation-system": meta(
    "幻灯片",
    "极简",
    "swiss-presentation-system",
  ),
  "swiss-grid": meta("卡片", "编辑", "swiss-grid"),
  "bauhaus-composition": meta("卡片", "编辑", "bauhaus-composition"),
  "newsroom-feature": meta("长页", "编辑", "newsroom-feature"),
  "documentary-scroll": meta("长页", "编辑", "documentary-scroll"),
  "data-command-center": meta("仪表盘", "数据", "data-screen"),
  "data-journalism": meta("报告", "数据", "data-journalism"),
  "academic-paper": meta("文档", "编辑", "academic-paper"),
  "product-spec": meta("文档", "数据", "product-spec"),
};

const RAW_DESIGN_STYLES: RawDesignStyle[] = [
  {
    id: "vercel",
    name: "极简黑白 · Vercel",
    category: "科技产品/极简工程",
    accent: "#000000",
    description: "黑白精确主义，大留白，Geist 风格无衬线，锐利分割线",
    previewHtml: `<div style="font-family: Geist, Inter, sans-serif; background: #fff; padding: 16px; height: 100%; border: 1px solid #eaeaea; display: flex; flex-direction: column;">
  <div style="font-size: 14px; font-weight: 700; color: #000; margin-bottom: 8px;">Vercel Deploy</div>
  <div style="font-size: 8px; color: #666; margin-bottom: auto;">Push your code and deploy instantly.</div>
  <div style="margin-top: 12px; display: flex; gap: 6px;">
    <div style="background: #000; color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 6px; font-weight: 500;">Deploy</div>
    <div style="border: 1px solid #eaeaea; color: #666; padding: 4px 8px; border-radius: 6px; font-size: 6px;">Cancel</div>
  </div>
</div>`,
    style: `【视觉主题】黑白精确主义，极简工程师审美（参考 Vercel）
【色彩系统】
 - 基础底色：纯白 #ffffff
 - 文本颜色：主标题纯黑 #000000，次要文本中灰 #666666
 - 分割线与边框：极浅灰 #eaeaea
 - 强调色：纯黑 #000000
【排版规则】
 - 字体：无衬线体（优先 Geist / Inter）
 - 层级：标题字重 700 且字距收紧，正文字重 400 行高 1.6
【组件特征】
 - 卡片：纯白背景，6px 极小圆角，1px #eaeaea 边框，**严格禁止使用阴影**。
 - 按钮：纯黑背景，纯白文字，6px 圆角。
【布局原则】大量留白，元素间距严格对齐，视觉呈现绝对的冷静与精确。`,
  },
  {
    id: "stripe",
    name: "紫色渐变 · Stripe",
    category: "科技产品/金融科技",
    accent: "#635bff",
    description: "标志性紫色渐变，weight-300 轻盈优雅，斜切色块",
    previewHtml: `<div style="font-family: sans-serif; background: #fff; padding: 16px; height: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(99,91,255,0.1); display: flex; flex-direction: column;">
  <div style="font-size: 14px; font-weight: 400; color: #30313d; margin-bottom: 8px;">Payment</div>
  <div style="font-size: 8px; color: #425466; margin-bottom: auto;">Secure processing with Stripe.</div>
  <div style="background: linear-gradient(90deg, #635bff, #00d4ff); color: #fff; padding: 6px; border-radius: 12px; font-size: 8px; font-weight: 600; text-align: center; margin-top: 12px;">Pay $120</div>
</div>`,
    style: `【视觉主题】科技与优雅融合，顶级金融科技质感（参考 Stripe）
【色彩系统】
 - 基础底色：纯白 #ffffff 或极浅灰
 - 文本颜色：深灰标题 #30313d，正文偏蓝灰 #425466
 - 强调色：标志性紫色 #635bff 及其渐变（蓝紫到青色）
【排版规则】
 - 字体：现代无衬线体
 - 层级：标题常用细字重（300-500），显得轻盈高级，正文行距宽松
【组件特征】
 - 卡片：白底，柔和大圆角（12-16px），伴有轻微且柔和的彩色投影（如 rgba(99, 91, 255, 0.1)）。
 - 按钮：紫色渐变或纯色填充，大圆角或完全胶囊形。
【布局原则】常伴随斜切的背景色块或柔和的渐变光晕，具备极强的信任感与高级感。`,
  },
  {
    id: "linear",
    name: "精密深色 · Linear",
    category: "科技产品/精密工具",
    accent: "#5e6ad2",
    description: "超极简深色，精密网格，淡紫强调，克制动效",
    previewHtml: `<div style="font-family: Inter, sans-serif; background: linear-gradient(180deg, #1c1c1f, #08090a); padding: 16px; height: 100%; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column;">
  <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
    <div style="width: 8px; height: 8px; border-radius: 50%; border: 1px solid #5e6ad2;"></div>
    <div style="font-size: 10px; font-weight: 600; color: #f7f8f8;">LIN-128</div>
  </div>
  <div style="font-size: 12px; font-weight: 600; color: #f7f8f8; margin-bottom: 4px;">Update API</div>
  <div style="font-size: 8px; color: #8a8f98;">Implement the new v2 endpoints.</div>
</div>`,
    style: `【视觉主题】精密深色界面，冷峻的工程师审美（参考 Linear）
【色彩系统】
 - 基础底色：深色底（#08090a ~ #1c1c1f 渐变）
 - 文本颜色：高亮白 #f7f8f8 与次要灰 #8a8f98
 - 强调色：淡靛紫 #5e6ad2
 - 边框色：微亮边框 rgba(255,255,255,0.08)
【排版规则】
 - 字体：紧凑无衬线体，字距略收紧
 - 层级：标题字重 600，高对比度
【组件特征】
 - 卡片：半透明深色面板，1px 微亮边框，细腻低调的暗投影。
 - 按钮：极简深灰底色或淡紫底色。
【布局原则】精密网格，所有元素边缘对齐极致严谨，极度克制。`,
  },
  {
    id: "apple",
    name: "高级留白 · Apple",
    category: "设计创意/品牌叙事",
    accent: "#0071e3",
    description: "SF Pro 风格，超大留白，居中叙事，电影感大标题",
    previewHtml: `<div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #f5f5f7; padding: 16px; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
  <div style="font-size: 18px; font-weight: 600; color: #1d1d1f; letter-spacing: -0.5px; margin-bottom: 4px;">Pro cameras.</div>
  <div style="font-size: 18px; font-weight: 600; color: #1d1d1f; letter-spacing: -0.5px; margin-bottom: 8px;">Pro display.</div>
  <div style="font-size: 8px; color: #86868b; margin-bottom: 12px;">The most advanced system yet.</div>
  <div style="background: #0071e3; color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 6px; font-weight: 500;">Buy</div>
</div>`,
    style: `【视觉主题】极简、高级、电影感叙事（参考 Apple 官网）
【色彩系统】
 - 基础底色：纯净白底或极浅灰 #f5f5f7
 - 文本颜色：深黑 #1d1d1f，次要灰 #86868b
 - 强调色：苹果蓝 #0071e3
【排版规则】
 - 字体：SF Pro 风格现代无衬线体
 - 层级：超大居中大标题（字重 600，字距紧凑），配小巧精致的副标题
【组件特征】
 - 卡片：圆润边角（18px+），白色背景，近乎无边界或柔和微投影。
 - 按钮：经典蓝色胶囊形（全圆角）。
【布局原则】超大垂直留白（120px+），居中对齐为主，产品图极其突出。`,
  },
  {
    id: "spotify",
    name: "暗色霓虹 · Spotify",
    category: "媒体内容/音乐娱乐",
    accent: "#1db954",
    description: "深黑底霓虹绿，超粗大标题，专辑封面式视觉",
    previewHtml: `<div style="font-family: Circular, sans-serif; background: linear-gradient(180deg, #333, #121212); padding: 16px; height: 100%; border-radius: 8px; display: flex; flex-direction: column;">
  <div style="width: 100%; aspect-ratio: 1; background: #282828; border-radius: 4px; margin-bottom: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);"></div>
  <div style="font-size: 14px; font-weight: 800; color: #fff; margin-bottom: 4px; letter-spacing: -0.5px;">Daily Mix 1</div>
  <div style="font-size: 8px; color: #b3b3b3; line-height: 1.4;">Made for you</div>
  <div style="margin-top: auto; align-self: flex-end; width: 24px; height: 24px; border-radius: 50%; background: #1db954; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"></div>
</div>`,
    style: `【视觉主题】暗色活力、音乐与情绪驱动（参考 Spotify）
【色彩系统】
 - 基础底色：近黑 #121212 与深灰渐变
 - 文本颜色：纯白 #ffffff 与亮灰 #b3b3b3
 - 强调色：霓虹绿 #1db954
【排版规则】
 - 字体：极粗大无衬线体
 - 层级：标题字重 800-900，视觉冲击极强
【组件特征】
 - 卡片：深灰圆角面板，悬浮上浮互动，常配大图。
 - 按钮：鲜艳的绿色圆角或胶囊。
【布局原则】卡片与图库排布紧凑，大面积暗色映衬彩色封面图，强调沉浸感。`,
  },
  {
    id: "editorial",
    name: "杂志编辑 · WIRED",
    category: "媒体内容/杂志编辑",
    accent: "#1a1aff",
    description: "报刊密度排版，自定义衬线大标题，墨蓝链接",
    style: `【视觉主题】科技杂志编辑风，印刷质感（参考 WIRED）
【色彩系统】
 - 基础底色：纸白底 #fafafa
 - 文本颜色：纯黑正文 #111111，浅灰标注
 - 强调色：墨蓝或克莱因蓝 #1a1aff
【排版规则】
 - 字体：大标题必须用极粗的现代衬线体（Georgia/Times 风格），正文使用衬线或清晰无衬线。
 - 层级：首字下沉，压紧的标题行距。
【组件特征】
 - 装饰：利用粗细对比的实体横线（border-top/bottom）分隔小节。
 - 引用块：左侧竖线或极大引号标注。
【布局原则】多栏排版，信息密度高，具备传统报刊的权威感。`,
  },
  {
    id: "terminal",
    name: "开发者代码 · Terminal",
    category: "科技产品/开发极客",
    accent: "#00ff9c",
    description: "等宽字体、命令片段、API 示例和调试信息清晰排布",
    previewHtml: `<div style="font-family: Consolas, Monaco, monospace; background: #0f1115; color: #a9b1d6; padding: 14px; height: 100%; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; box-sizing: border-box;">
  <div style="display: flex; gap: 5px; margin-bottom: 10px;">
    <div style="width: 6px; height: 6px; border-radius: 50%; background: #ff5f56;"></div>
    <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffbd2e;"></div>
    <div style="width: 6px; height: 6px; border-radius: 50%; background: #27c93f;"></div>
  </div>
  <div style="font-size: 12px; color: #00ff9c; margin-bottom: 4px;">$ npm run dev</div>
  <div style="font-size: 11px; color: #787c99; margin-bottom: auto; line-height: 1.4;">
    > markdown2view@1.0.0 dev<br>
    > vite --port 3000<br>
    <span style="color: #3b82f6;">➜</span> Local: http://localhost:3000
  </div>
  <div style="font-size: 10px; color: #565f89; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px; text-align: right;">UTF-8</div>
</div>`,
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
【布局原则】适合 CLI 教程、SDK 说明、调试记录、技术方案附录；重点是可读和可复制。`,
  },
  {
    id: "xiaohongshu",
    name: "社媒卡片 · 小红书",
    category: "媒体内容/社交卡片",
    accent: "#ff2e4d",
    description: "竖屏卡片，柔和渐变，大圆角，亲切手账感",
    style: `【视觉主题】亲切、可爱、手账感的种草卡片（参考 小红书）
【色彩系统】
 - 基础底色：柔和的粉彩或奶油渐变（如浅黄到浅粉）
 - 文本颜色：深灰近黑 #333333，次要灰 #999999
 - 强调色：明快红粉 #ff2e4d
【排版规则】
 - 字体：圆润活泼的无衬线体。
 - 层级：标题字重 700 且经常搭配 Emoji。
【组件特征】
 - 卡片：大圆角面板（20-24px），柔和宽泛的背景投影。
 - 标签：彩色背景小圆角 Tag，用于圈出重点。
【布局原则】非常适合竖向浏览，分点排版，重点极其突出。`,
  },
  {
    id: "notion",
    name: "暖色极简 · Notion",
    category: "文档知识/知识文档",
    accent: "#0f0f0f",
    description: "暖白底，衬线标题，柔和表面，文档阅读优化",
    previewHtml: `<div style="font-family: -apple-system, sans-serif; background: #ffffff; padding: 16px 20px; height: 100%; display: flex; flex-direction: column;">
  <div style="font-family: Lyon-Text, Georgia, serif; font-size: 18px; font-weight: 700; color: #37352f; margin-bottom: 12px;">Project Spec</div>
  <div style="background: #f1f1ef; padding: 8px; border-radius: 4px; display: flex; gap: 6px; margin-bottom: 12px;">
    <span>💡</span>
    <div style="font-size: 8px; color: #37352f;">This is an important callout block.</div>
  </div>
  <div style="font-size: 8px; color: #787774; line-height: 1.6;">Start writing here...</div>
</div>`,
    style: `【视觉主题】专注阅读与书写的暖色极简文档（参考 Notion）
【色彩系统】
 - 基础底色：暖白 #ffffff 或 #f7f6f3
 - 文本颜色：深灰近黑 #37352f，次要文本 #787774
 - 背景块：极其柔和的浅灰色块（如 #f1f1ef）
【排版规则】
 - 字体：标题强制使用优雅衬线体，正文使用无衬线体。
 - 层级：正文行高舒适（1.6-1.7），段落间距明显。
【组件特征】
 - Callout 卡片：带有一侧边框或浅底色，前缀常带一个大 Emoji。
 - 引用块：左侧细竖线。
【布局原则】左对齐或居中定宽，无冗余装饰。`,
  },
  {
    id: "xhs-multipage",
    name: "小红书多页图文",
    category: "媒体内容/多页图文",
    accent: "#ff2e4d",
    description: "3:4 多页卡片：封面页 + N 张内容页",
    previewHtml: `<div style="font-family: sans-serif; background: #fffbeb; padding: 12px; height: 100%; border-radius: 12px; border: 1px solid #ffe3e6; display: flex; gap: 8px; box-sizing: border-box;">
  <div style="flex: 1; background: linear-gradient(135deg, #ff2e4d, #ff6b8b); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; color: #fff;">
    <div style="font-size: 10px; font-weight: bold;">COVER</div>
    <div style="font-size: 12px; font-weight: 900; line-height: 1.2;">小红书多页<br>排版秘籍</div>
    <div style="font-size: 9px; opacity: 0.8;">Page 1/3</div>
  </div>
  <div style="flex: 1; background: #fff; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #eaeaea;">
    <div style="font-size: 9px; font-weight: bold; color: #ff2e4d;">01/干货</div>
    <div style="font-size: 9px; color: #444; line-height: 1.3;">内容页展示：分步排版，左右滑动查看...</div>
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: #999;">
      <span>Swipe ➜</span>
      <span>2/3</span>
    </div>
  </div>
</div>`,
    style: `【视觉主题】小红书划动图文，多页独立卡片
【色彩系统】
 - 封面底色：强视觉渐变或大图叠加
 - 内容底色：干净白底 #ffffff 辅以微小装饰
 - 强调色：主红 #ff2e4d
【排版规则】
 - 字体：大字号无衬线加粗，强烈的情绪传递。
【组件特征】
 - **强制分页容器**：每一张图必须使用 \`<section class="page">\` 包裹。
 - 页面尺寸：宽高固定比例 3:4（例如内部强制 height:100vh 或者 1440x1080 设定，需保证撑满一屏）。
【布局原则】
 - 封面大标题居中 + 底部标签；
 - 内容页顶部小标题，中间内容，底部页码指示器。`,
  },
  {
    id: "ppt-slide",
    name: "基础幻灯片",
    category: "演示汇报/基础幻灯",
    accent: "#2563eb",
    description: "通用 16:9 横版幻灯片，适合作为空白起点",
    previewHtml: `<div style="font-family: sans-serif; background: #002FA7; color: #fff; padding: 16px; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; justify-content: space-between;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 6px;">
    <span style="font-size: 9px; font-weight: bold; letter-spacing: 1px;">PRESENTATION</span>
    <span style="font-size: 9px; opacity: 0.5;">01</span>
  </div>
  <div style="margin-top: 10px; margin-bottom: auto;">
    <div style="font-size: 18px; font-weight: 700; line-height: 1.2; margin-bottom: 6px; letter-spacing: -0.2px;">构建纯前端渲染工作台</div>
    <div style="font-size: 10px; opacity: 0.7;">An elegant way to export PDF and PNG files.</div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px;">
    <span style="font-size: 8px; opacity: 0.5;">Antigravity Design</span>
    <div style="display: flex; gap: 3px;">
      <div style="width: 4px; height: 4px; border-radius: 50%; background: #fff;"></div>
      <div style="width: 4px; height: 4px; border-radius: 50%; background: #fff; opacity: 0.3;"></div>
      <div style="width: 4px; height: 4px; border-radius: 50%; background: #fff; opacity: 0.3;"></div>
    </div>
  </div>
</div>`,
    style: `【视觉主题】专业商务幻灯片，演示大屏展示
【色彩系统】
 - 基础底色：深蓝商务底色或纯白底
 - 强调色：可信蓝 #2563eb
【排版规则】
 - 字体：现代无衬线体，极大字号以保证远距离可读。
 - 层级：标题层级极度分明。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹。
 - 页面尺寸：固定比例 16:9 横板。
【布局原则】单页信息极少，大面积留白。封面居中，内容页分左右栏或上下结构。`,
  },
  {
    id: "dashboard",
    name: "现代仪表盘",
    category: "数据分析/仪表盘",
    accent: "#3b82f6",
    description: "B端现代数据面板，Bento网格布局，清晰的信息层级与微交互",
    previewHtml: `<div style="font-family: sans-serif; background: #f8fafc; padding: 12px; height: 100%; display: flex; flex-direction: column; gap: 8px; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 11px; font-weight: bold; color: #0f172a;">Business Panel</span>
    <span style="font-size: 8px; background: #e2e8f0; color: #475569; padding: 1px 4px; border-radius: 4px; font-weight: bold;">LIVE</span>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; flex: 1;">
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between;">
      <span style="font-size: 9px; color: #64748b;">Daily Revenue</span>
      <span style="font-size: 15px; font-weight: 800; color: #2563eb;">$12.4K</span>
    </div>
    <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; display: flex; flex-direction: column; justify-content: space-between;">
      <span style="font-size: 9px; color: #64748b;">Conversion</span>
      <span style="font-size: 15px; font-weight: 800; color: #10b981;">3.42%</span>
    </div>
  </div>
  <div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
    <span style="font-size: 9px; color: #64748b;">Active Users</span>
    <div style="display: flex; gap: 2px; align-items: flex-end; height: 16px;">
      <div style="width: 3px; height: 8px; background: #2563eb; border-radius: 1px;"></div>
      <div style="width: 3px; height: 12px; background: #2563eb; border-radius: 1px;"></div>
      <div style="width: 3px; height: 6px; background: #2563eb; border-radius: 1px;"></div>
      <div style="width: 3px; height: 14px; background: #2563eb; border-radius: 1px;"></div>
    </div>
  </div>
</div>`,
    style: `【视觉主题】现代B端商业数据仪表盘（Data Dashboard）
【色彩系统】
 - 基础底色：浅灰全局背景（如 #f8fafc）配以纯白数据卡片，营造呼吸感。
 - 文本颜色：信息层级分明，指标标题用次级灰（#64748b），核心数值用纯黑（#0f172a）。
 - 强调色：强语义色彩（绿 #10b981 代表上升，红 #ef4444 代表下降，蓝 #3b82f6 代表强调）。严禁滥用彩虹色。
【排版规则】
 - 字体：极简无衬线体。数字必须使用等宽数字（font-variant-numeric: tabular-nums）以保证垂直对齐。
 - KPI展示：核心指标采用超大字号加粗，旁边必须配有带背景色的微小趋势标签（如 ↑ 12%）。
【组件特征】
 - 卡片容器：利用 CSS Grid 或 Bento 网格系统，将图表与数据切割在带圆角（12px）和细腻阴影（shadow-sm/border）的白色卡片中。
 - 微型图表：用纯 CSS 或 HTML 元素绘制进度条、状态指示灯或极简的趋势柱状块，拒绝复杂的空白图表占位。
【布局原则】"少即是多"（Less is more）。顶部展示核心数据卡片，下方展示详细图表或表格区域，整体高度对齐，减少用户的认知负荷。`,
  },
  {
    id: "resume",
    name: "简历 / 个人主页",
    category: "文档知识/个人简历",
    accent: "#0891b2",
    description: "单页简历，左右分栏，清晰层级，A4 打印友好",
    previewHtml: `<div style="font-family: sans-serif; background: #fff; border: 1px solid #e2e8f0; height: 100%; display: flex; box-sizing: border-box;">
  <div style="width: 30%; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 12px 8px; display: flex; flex-direction: column; gap: 8px; justify-content: space-between;">
    <div>
      <div style="width: 24px; height: 24px; border-radius: 50%; background: #0891b2; margin-bottom: 6px;"></div>
      <div style="font-size: 11px; font-weight: bold; color: #0f172a;">张明华</div>
      <div style="font-size: 8px; color: #64748b; margin-bottom: 8px;">前端工程师</div>
    </div>
    <div style="font-size: 8px; color: #64748b; line-height: 1.4;">
      📍 深圳<br>
      ✉️ hi@jming.me<br>
      🔗 github.com
    </div>
  </div>
  <div style="flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 8px; justify-content: space-between;">
    <div>
      <div style="font-size: 9px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">工作经历</div>
      <div style="margin-bottom: 4px;">
        <div style="font-size: 9px; font-weight: bold; color: #0f172a;">深圳科技发展有限公司</div>
        <div style="font-size: 8px; color: #64748b;">高级前端 · 2024 - 至今</div>
      </div>
      <div style="font-size: 8px; color: #475569; line-height: 1.35;">主导重构核心排版引擎，将包体积减少 40%，实现完全纯前端导出 PDF。</div>
    </div>
    <div>
      <div style="font-size: 9px; font-weight: bold; color: #0891b2; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">开源项目</div>
      <div style="font-size: 8px; color: #475569; font-weight: bold;">markdown2view ➜</div>
    </div>
  </div>
</div>`,
    style: `【视觉主题】专业清晰的 A4 打印级简历
【色彩系统】
 - 基础底色：纯白 #ffffff
 - 侧边栏色（可选）：浅灰 #f8fafc 或深青色
 - 强调色：商务青 #0891b2
【排版规则】
 - 字体：现代无衬线体，阅读流畅。
 - 层级：经历时间线对齐，公司名加粗，职位名偏灰。
【组件特征】
 - 容器：如果有多页请使用 \`<section class="page">\` 包裹，整体定宽 A4 比例。
 - 模块：时间轴节点（小圆点与左侧虚线）。
【布局原则】典型的左右双栏结构，左窄右宽，高度紧凑，留白克制但绝不拥挤。`,
  },
  {
    id: "claude",
    name: "克制温和 · Claude",
    category: "科技产品/AI 助手",
    accent: "#d97757",
    description: "暖白底，衬线体标题搭配无衬线正文，阅读体验极佳的温和科技感",
    previewHtml: `<div style="font-family: Georgia, serif; background: #faf9f8; padding: 14px; height: 100%; border: 1px solid #e5e5db; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; gap: 8px; align-items: flex-start; margin-bottom: auto;">
    <div style="width: 18px; height: 18px; border-radius: 4px; background: #d97757; color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center; font-weight: bold; shrink: 0; font-family: sans-serif;">C</div>
    <div style="flex: 1;">
      <div style="font-size: 11px; font-weight: bold; color: #1a1a1a; font-family: Georgia, serif; margin-bottom: 4px;">Claude's Perspective</div>
      <div style="font-size: 10px; color: #444; line-height: 1.4; text-align: justify;">This layout prioritizes long-form readability, warm editorial spacing, and elegant serif typography. It feels thoughtful, human, and balanced.</div>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e5e5db; padding-top: 8px; margin-top: 8px;">
    <span style="font-size: 8px; color: #8a8a80;">Model: Sonnet 3.5</span>
    <span style="font-size: 8px; background: #f0ede6; color: #6e6e65; padding: 1px 4px; border-radius: 4px;">1.4k tokens</span>
  </div>
</div>`,
    style: `【视觉主题】克制、温和、富有书卷气的 AI 对话窗（参考 Claude）
【色彩系统】
 - 基础底色：暖白 #fdfdfc 或 #faf9f8
 - 文本颜色：深灰偏暖 #2a2a2a
 - 强调色：古典陶土红/深橘 #d97757
【排版规则】
 - 字体：标题优雅衬线体（Tiempos/宋体），正文无衬线。
【组件特征】
 - 卡片：圆角适中（8-12px），淡淡的灰边框或阴影。
【布局原则】无多余装饰，对话体阅读体验极佳。`,
  },
  {
    id: "figma",
    name: "创意工具 · Figma",
    category: "设计创意/设计工具",
    accent: "#0d99ff",
    description: "纯白底，纯黑字，鲜艳纯色点缀，粗边框与工具感面板",
    previewHtml: `<div style="font-family: sans-serif; background: #f5f5f5; border: 1px solid #e2e8f0; height: 100%; display: flex; box-sizing: border-box;">
  <div style="width: 32px; background: #fff; border-right: 1px solid #e2e8f0; padding: 8px 4px; display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; gap: 6px;">
      <div style="width: 16px; height: 16px; border-radius: 3px; background: #0d99ff; display: flex; justify-content: center; align-items: center; color: #fff; font-size: 8px; font-weight: bold;">⌘</div>
      <div style="width: 16px; height: 16px; border-radius: 3px; background: #f5f5f5; display: flex; justify-content: center; align-items: center; color: #555; font-size: 8px;">T</div>
    </div>
    <div style="width: 16px; height: 16px; border-radius: 50%; background: #f24e1e;"></div>
  </div>
  <div style="flex: 1; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
    <div style="border: 1px dashed #0d99ff; border-radius: 4px; padding: 8px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <div style="font-size: 10px; font-weight: bold; color: #000; margin-bottom: 2px;">Card Frame</div>
      <div style="font-size: 8px; color: #666; line-height: 1.3;">Designing micro components inside Figma mockup...</div>
    </div>
    <div style="position: absolute; bottom: 16px; right: 24px; display: flex; gap: 4px; align-items: center;">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#1abc9c" stroke="#1abc9c" style="transform: rotate(-45deg);"><polygon points="5 3 19 12 12 14 5 3"/></svg>
      <span style="background: #1abc9c; color: #fff; font-size: 7px; padding: 1px 4px; border-radius: 3px;">Alex</span>
    </div>
    <div style="font-size: 8px; color: #999;">Canvas: 80%</div>
  </div>
</div>`,
    style: `【视觉主题】设计工具面板，极其紧凑且充满创造力（参考 Figma）
【色彩系统】
 - 基础底色：纯白 #ffffff 与工具面板灰 #f5f5f5
 - 文本颜色：纯黑 #000000
 - 强调色：多色纯粹饱和（蓝 #0d99ff、粉 #f24e1e、绿 #1abc9c）
【排版规则】
 - 字体：系统极简字体 Inter。字号整体偏小。
【组件特征】
 - 面板：极细分割线，偶尔出现深色带有小尾巴的气泡提示（Tooltip）。
【布局原则】UI 元素极度靠近，紧凑型网格。`,
  },
  {
    id: "airbnb",
    name: "亲和旅行 · Airbnb",
    category: "设计创意/消费品牌",
    accent: "#ff385c",
    description: "圆润大字重，柔和投影，标志性粉红，以图为主",
    previewHtml: `<div style="font-family: sans-serif; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; box-sizing: border-box; padding-bottom: 12px;">
  <div style="height: 52%; background: linear-gradient(135deg, #ff385c, #ff5a5f); display: flex; justify-content: center; align-items: center; color: #fff; font-size: 20px; font-weight: bold; position: relative;">
    ✈️
    <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.3); color: #fff; font-size: 8px; padding: 2px 6px; border-radius: 10px;">★ 4.95</div>
  </div>
  <div style="padding: 0 12px; margin-top: auto; display: flex; flex-direction: column; gap: 2px;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 12px; font-weight: bold; color: #222;">京都 · 隐世木屋</span>
      <span style="font-size: 10px; font-weight: bold; color: #ff385c;">¥580 / 晚</span>
    </div>
    <div style="font-size: 9px; color: #717171; line-height: 1.3;">庭院樱花盛开，步行 5 分钟到地铁站，体验传统日式生活。</div>
  </div>
</div>`,
    style: `【视觉主题】温暖、友善的高质量消费界面（参考 Airbnb）
【色彩系统】
 - 基础底色：纯净白
 - 文本颜色：深黑与中灰
 - 强调色：珊瑚粉红 #ff385c
【排版规则】
 - 字体：现代圆润无衬线。
 - 标题使用极粗的字重（800），充满安全感和亲和力。
【组件特征】
 - 卡片：无硬边框，极其宽泛弥散的柔和投影。
【布局原则】注重超大图片的展示力。`,
  },
  {
    id: "supabase",
    name: "开源极客 · Supabase",
    category: "科技产品/开源数据",
    accent: "#3ecf8e",
    description: "深灰背景，亮绿强调，等宽字体点缀，暗黑开源风",
    previewHtml: `<div style="font-family: Consolas, monospace; background: #1c1c1c; color: #ededed; padding: 14px; height: 100%; border: 1px solid #2e2e2e; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #2e2e2e; padding-bottom: 6px; margin-bottom: 8px;">
      <span style="color: #3ecf8e; font-size: 11px; font-weight: bold;">⚡ supabase</span>
      <span style="color: #666; font-size: 8px;">active</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="font-size: 10px; color: #888;">SELECT * FROM profiles;</div>
      <div style="background: #242424; border: 1px solid #333; border-radius: 4px; padding: 4px; font-size: 9px;">
        <span style="color: #3ecf8e;">id:</span> 1 &nbsp;
        <span style="color: #3ecf8e;">name:</span> "Antigravity"<br>
        <span style="color: #3ecf8e;">role:</span> "Developer"
      </div>
    </div>
  </div>
  <div style="font-size: 9px; color: #555; text-align: right;">PostgreSQL 15.1</div>
</div>`,
    style: `【视觉主题】暗色极客，现代开源数据库（参考 Supabase）
【色彩系统】
 - 基础底色：极深灰/近黑 #1c1c1c
 - 文本颜色：灰白 #ededed
 - 强调色：高亮翠绿 #3ecf8e
【排版规则】
 - 字体：代码和数据大量穿插等宽字体。
【组件特征】
 - 面板：1px 反光内描边，常带有微弱的绿色泛光。
【布局原则】严谨的开发者文档式排版。`,
  },
  {
    id: "raycast",
    name: "毛玻璃 · Raycast",
    category: "科技产品/系统工具",
    accent: "#ff6363",
    description: "macOS 原生感，深色毛玻璃，悬浮搜索框，极致动效",
    previewHtml: `<div style="font-family: sans-serif; background: #18181b; padding: 12px; height: 100%; border: 1px solid #27272a; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
  <div style="background: #27272a; border-radius: 6px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between;">
    <span style="color: #d4d4d8; font-size: 11px;">Search commands...</span>
    <span style="background: #3f3f46; color: #a1a1aa; font-size: 9px; padding: 1px 4px; border-radius: 3px;">⌘ K</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px; flex: 1;">
    <div style="background: rgba(255,99,99,0.1); border-radius: 4px; padding: 4px 8px; display: flex; align-items: center; justify-content: space-between;">
      <span style="color: #ff6363; font-size: 10px; font-weight: bold;">Create Snippet</span>
      <span style="color: #71717a; font-size: 8px;">Extension</span>
    </div>
    <div style="padding: 4px 8px; display: flex; align-items: center; justify-content: space-between;">
      <span style="color: #a1a1aa; font-size: 10px;">Clear Clipboard History</span>
      <span style="color: #71717a; font-size: 8px;">System</span>
    </div>
  </div>
</div>`,
    style: `【视觉主题】极致丝滑的 macOS 悬浮窗口（参考 Raycast）
【色彩系统】
 - 基础底色：深色毛玻璃（rgba(0,0,0,0.5) 配合 blur(20px)）
 - 强调色：红色或高亮蓝。
【排版规则】
 - 极简苹果原生系统字体，小字号，精细对齐。
【组件特征】
 - 带有内反光（rgba(255,255,255,0.1)）的精美卡片。
 - 深色小标签高亮快捷键。
【布局原则】列表排布密集且克制。`,
  },
  {
    id: "mongodb",
    name: "企业数据 · MongoDB",
    category: "科技产品/企业数据",
    accent: "#00ed64",
    description: "深蓝色/乳白底，几何粗体，标志性亮绿，企业信任感",
    previewHtml: `<div style="font-family: sans-serif; background: #001e2b; padding: 14px; height: 100%; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid rgba(0,237,100,0.15);">
  <div>
    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
      <div style="width: 14px; height: 14px; border-radius: 3px; background: #00ed64; display: flex; align-items: center; justify-content: center; font-size: 9px;">🍃</div>
      <span style="color: #fff; font-size: 11px; font-weight: 800; letter-spacing: 0.5px;">MongoDB Atlas</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 9.5px;">
      <div style="color: #88a4bf;">db.users.find({ status: "active" })</div>
      <div style="color: #00ed64; padding-left: 8px;">➜ [ 128 documents found ]</div>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
    <span style="color: #88a4bf; font-size: 8px;">Cluster0.primary</span>
    <div style="width: 6px; height: 6px; border-radius: 50%; background: #00ed64; box-shadow: 0 0 6px #00ed64;"></div>
  </div>
</div>`,
    style: `【视觉主题】稳重、强大的企业数据平台（参考 MongoDB）
【色彩系统】
 - 基础底色：午夜深蓝 #001e2b 或 乳白底
 - 强调色：极其明亮的树叶绿 #00ed64
【排版规则】
 - 字体：几何感极强的粗壮无衬线体。
【组件特征】
 - 大块深色和浅色的截然对比，力量感强。
【布局原则】大版面，块状分明。`,
  },
  {
    id: "framer",
    name: "丝滑动效 · Framer",
    category: "设计创意/建站动效",
    accent: "#0055ff",
    description: "高对比度，柔和发光，精美卡片悬浮，顶级建站审美",
    previewHtml: `<div style="font-family: sans-serif; background: #000; color: #fff; padding: 14px; height: 100%; border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; position: relative; overflow: hidden; border: 1px solid #111;">
  <div style="position: absolute; top: -30px; left: -30px; width: 80px; height: 80px; background: radial-gradient(circle, rgba(0,85,255,0.4) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>
  <div style="display: flex; justify-content: space-between; align-items: center; z-index: 1;">
    <span style="font-size: 11px; font-weight: bold; color: #fff; letter-spacing: 0.5px;">⚡ Framer Pro</span>
    <span style="font-size: 8px; border: 1px solid #0055ff; color: #0055ff; padding: 1px 4px; border-radius: 10px; font-weight: bold;">PUBLISHED</span>
  </div>
  <div style="z-index: 1; margin-top: 10px; margin-bottom: auto;">
    <div style="font-size: 16px; font-weight: 800; line-height: 1.1; margin-bottom: 4px; background: linear-gradient(90deg, #fff, #0055ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Build websites, faster.</div>
    <div style="font-size: 9px; color: #888; line-height: 1.3;">Design with canvas, publish with speed.</div>
  </div>
  <div style="display: flex; gap: 6px; z-index: 1;">
    <div style="background: #0055ff; color: #fff; font-size: 9px; padding: 3px 8px; border-radius: 6px; font-weight: 600;">Remix</div>
    <div style="background: #111; border: 1px solid #222; color: #aaa; font-size: 9px; padding: 3px 8px; border-radius: 6px;">Preview</div>
  </div>
</div>`,
    style: `【视觉主题】顶级现代建站的视觉冲击力（参考 Framer 官网）
【色彩系统】
 - 基础底色：纯净深黑或纯白。
 - 强调色：电光蓝 #0055ff，以及不规则的渐变色晕（radial-gradient）。
【排版规则】
 - 字体：极具设计感的大字号无衬线。
【组件特征】
 - 大圆角（24px+），卡片叠加或交织。
【布局原则】自由但极度考究的留白比例。`,
  },
  {
    id: "github",
    name: "开源协作 · GitHub",
    category: "科技产品/开源协作",
    accent: "#2f81f7",
    description: "经典浅色/深灰，冷色边框，蓝色链接，代码原生感",
    previewHtml: `<div style="font-family: sans-serif; background: #fff; padding: 14px; height: 100%; border: 1px solid #d0d7de; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
      <span style="font-size: 11px; font-weight: bold; color: #0969da;">ZhongXiandou/markdown2view</span>
      <span style="border: 1px solid #d0d7de; font-size: 9px; padding: 1px 5px; border-radius: 10px; color: #57606a;">Public</span>
    </div>
    <div style="font-size: 10px; color: #57606a; line-height: 1.3; margin-bottom: 10px;">A pure frontend, zero backend workspace to render and export Markdown files.</div>
  </div>
  <div style="display: flex; gap: 3px; align-items: center; margin-bottom: 4px;">
    <div style="width: 10px; height: 10px; background: #ebedf0; border-radius: 2px;"></div>
    <div style="width: 10px; height: 10px; background: #9be9a8; border-radius: 2px;"></div>
    <div style="width: 10px; height: 10px; background: #40c463; border-radius: 2px;"></div>
    <div style="width: 10px; height: 10px; background: #30a14e; border-radius: 2px;"></div>
    <div style="width: 10px; height: 10px; background: #216e39; border-radius: 2px;"></div>
    <span style="font-size: 8px; color: #57606a; margin-left: 4px;">142 commits</span>
  </div>
</div>`,
    style: `【视觉主题】冷色、逻辑性、代码原生的开源环境（参考 GitHub）
【色彩系统】
 - 基础底色：纯白配浅灰区块，或深黑 #0d1117。
 - 边框色：冷灰色 #d0d7de 或 #30363d。
 - 强调色：克莱因蓝 #2f81f7
【排版规则】
 - 系统级无衬线体，代码段落紧密镶嵌。
【组件特征】
 - 大量浅色精细边框切分区域。按钮多为冷灰白底。
【布局原则】极其规整的盒子模型。`,
  },
  {
    id: "openai",
    name: "未来黑白 · OpenAI",
    category: "科技产品/前沿 AI",
    accent: "#10a37f",
    description: "纯黑白对比，优雅细体或宋体，微弱绿色点缀，未来极简",
    previewHtml: `<div style="font-family: sans-serif; background: #000; color: #fff; padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="font-size: 18px; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2; margin-top: 10px;">
    Introducing GPT-4o.<br>
    Our most advanced model.
  </div>
  <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #222; padding-top: 10px;">
    <span style="font-size: 10px; color: #888;">AI Frontier Research</span>
    <span style="font-size: 10px; color: #10a37f; font-weight: bold;">Learn more ➜</span>
  </div>
</div>`,
    style: `【视觉主题】前沿科技、充满哲学与神秘感的极致极简（参考 OpenAI 官网）
【色彩系统】
 - 基础底色：极致纯黑 #000000 或 纯白。
 - 强调色：极度节制的特有青绿 #10a37f
【排版规则】
 - 优雅的中文字体（黑体或具有书籍感的衬线）。
【组件特征】
 - 没有任何多余边框或阴影。
【布局原则】大面积空旷带来的未来压迫感与高级感。`,
  },
  {
    id: "arc",
    name: "多彩卡片 · Arc Browser",
    category: "设计创意/系统体验",
    accent: "#ff8a8a",
    description: "侧边栏布局，柔和多彩粉彩，极大圆角，拟物玻璃",
    previewHtml: `<div style="font-family: sans-serif; background: linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%); padding: 10px; height: 100%; border-radius: 12px; display: flex; gap: 8px; box-sizing: border-box;">
  <div style="width: 30%; background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); border-radius: 8px; padding: 8px 4px; display: flex; flex-direction: column; gap: 6px; border: 1px solid rgba(255,255,255,0.2);">
    <div style="width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.4); margin-bottom: 4px;"></div>
    <div style="height: 3px; width: 80%; background: rgba(255,255,255,0.5); border-radius: 1px;"></div>
    <div style="height: 3px; width: 60%; background: rgba(255,255,255,0.5); border-radius: 1px;"></div>
  </div>
  <div style="flex: 1; background: #fff; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(255,255,255,0.3);">
    <div style="font-size: 10px; font-weight: bold; color: #333;">Arc Browser</div>
    <div style="font-size: 8.5px; color: #666; line-height: 1.35;">A new internet experience with smart vertical tabs.</div>
    <div style="font-size: 8px; color: #ff8a8a; text-align: right; font-weight: bold;">v1.2.0</div>
  </div>
</div>`,
    style: `【视觉主题】多彩、透明、灵动现代的新型操作系统（参考 Arc 浏览器）
【色彩系统】
 - 基础底色：低饱和度粉彩（淡紫、淡蓝、淡黄）与半透明。
【排版规则】
 - 字体较小且精致。
【组件特征】
 - 极其夸张的大圆角或完全胶囊状。带有玻璃质感与反光。
【布局原则】卡片拼接排列（侧边与中央区块）。`,
  },
  {
    id: "discord",
    name: "游戏连麦 · Discord",
    category: "媒体内容/社区聊天",
    accent: "#5865F2",
    description: "深灰紫底色，标志性 Blurple，聊天对话流，年轻游戏感",
    previewHtml: `<div style="font-family: sans-serif; background: #2f3136; color: #fff; padding: 12px; height: 100%; display: flex; gap: 8px; box-sizing: border-box;">
  <div style="width: 20px; display: flex; flex-direction: column; gap: 6px; align-items: center; border-right: 1px solid rgba(255,255,255,0.05); padding-right: 4px;">
    <div style="width: 14px; height: 14px; border-radius: 50%; background: #5865F2; display: flex; align-items: center; justify-content: center; font-size: 7px; font-weight: bold;">D</div>
    <div style="width: 14px; height: 14px; border-radius: 50%; background: #3f4248;"></div>
  </div>
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="font-size: 9px; color: #8e9297; margin-bottom: 6px;"># general-chat</div>
      <div style="display: flex; gap: 6px; align-items: flex-start; margin-bottom: 6px;">
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #ff73fa; shrink: 0;"></div>
        <div>
          <div style="font-size: 9px; font-weight: bold; color: #fff;">GamerX <span style="font-size: 7px; color: #72767d; font-weight: normal;">12:04</span></div>
          <div style="font-size: 9px; color: #dcddde; line-height: 1.3;">Let's host a tech meetup tonight!</div>
        </div>
      </div>
    </div>
    <div style="background: #40444b; border-radius: 4px; padding: 4px 8px; font-size: 9px; color: #72767d;">Message #general-chat</div>
  </div>
</div>`,
    style: `【视觉主题】年轻化、社群驱动的深色游戏平台（参考 Discord）
【色彩系统】
 - 基础底色：深灰偏紫 #36393f / #2f3136
 - 强调色：专有蓝紫 Blurple #5865f2
【排版规则】
 - 紧凑的对话流排版模式。
【组件特征】
 - 圆形头像搭配状态小圆点，悬浮带有暗沉背景高亮。
【布局原则】信息高密度但不杂乱。`,
  },
  {
    id: "tailwind",
    name: "现代实用 · Tailwind CSS",
    category: "科技产品/开发框架",
    accent: "#38bdf8",
    description: "系统化字体，柔和阴影，蓝青主色，标准实用主义",
    previewHtml: `<div style="font-family: ui-sans-serif, system-ui; background: #f9fafb; padding: 16px; height: 100%; display: flex; flex-direction: column;">
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
    <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">Beautiful UI</div>
    <div style="font-size: 8px; color: #475569; margin-bottom: 12px;">Built with utility classes.</div>
    <div style="background: #38bdf8; color: #fff; padding: 6px; border-radius: 6px; font-size: 7px; font-weight: 500; text-align: center;">Get Started</div>
  </div>
</div>`,
    style: `【视觉主题】完美的实用主义现代网页标杆（参考 Tailwind UI）
【色彩系统】
 - 基础底色：白 #ffffff 配 浅灰 #f9fafb。
 - 文本颜色：石板灰 #1e293b 到 #475569。
 - 强调色：天空蓝 #38bdf8 或 靛蓝 #6366f1。
【排版规则】
 - 规整平衡的字体缩放。
【组件特征】
 - 标志性的精美弥散阴影层级（shadow-md/xl）。
【布局原则】标准、通用、无可挑剔的商业组件范式。`,
  },
  {
    id: "report",
    name: "年度报告",
    category: "文档知识/年度报告",
    accent: "#2f4f4f",
    description: "现代数字报告，适合数据叙事，暖白底自然色调，混搭字体",
    previewHtml: `<div style="font-family: Georgia, serif; background: #fffaf5; padding: 16px; height: 100%; border: 1px solid #ebdcc5; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="font-size: 8px; font-weight: 800; color: #2f4f4f; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">Annual Report 2026</div>
    <div style="font-size: 16px; font-weight: 900; color: #2f4f4f; line-height: 1.15; margin-bottom: 8px; border-bottom: 2px solid #2f4f4f; padding-bottom: 6px;">Data-Driven<br>Digital Economy</div>
  </div>
  <div style="display: flex; align-items: baseline; gap: 8px;">
    <span style="font-size: 24px; font-weight: 900; color: #2f4f4f;">+84%</span>
    <span style="font-size: 9.5px; color: #6b6359;">Year-over-Year User growth in APAC</span>
  </div>
  <div style="font-size: 8px; color: #8c8375; text-align: right; border-top: 1px solid #ebdcc5; padding-top: 6px;">PUBLISHED BY CONSULTING DEPT</div>
</div>`,
    style: `【视觉主题】故事驱动的现代数字年度报告（Annual Report）
【色彩系统】
 - 基础底色：暖调灰白/纸张色（如 #faf9f6 或 #f5f5f0），避免刺眼的纯白。
 - 文本颜色：深灰（非纯黑，如 #2c2c2c）以提供柔和的对比度。
 - 强调色：成熟、自然的色调（如森林绿、橄榄绿、大地色），用于重点数据和图表。
【排版规则】
 - 字体：标题可混搭优雅的古典衬线体（传达权威感与人文感）与现代无衬线体。正文使用高可读性的无衬线体。
 - 留白：极其慷慨的段落间距和页边距，减轻视觉疲劳。
【组件特征】
 - 核心数据：用醒目的大字号与强调色展示核心数字，取代密集的传统表格。
 - **强制分页容器**：如果是一份多页报告，每一页必须使用 \`<section class="page">\` 独立包裹，尺寸定宽（如 A4 或横屏幻灯片比例）。
【布局原则】单页突出一个核心洞察，排版类似高端商业杂志，内容结构化且叙事清晰。`,
  },
  {
    id: "poster",
    name: "平面海报",
    category: "设计创意/平面海报",
    accent: "#ff3366",
    description: "硬核平面海报美学，Bento网格，超大标题展示，视觉冲击力极强",
    previewHtml: `<div style="font-family: 'Arial Black', sans-serif; background: #ff3366; color: #000; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #d61845; position: relative;">
  <div style="position: absolute; bottom: 8px; right: 8px; width: 60px; height: 60px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ff3366; font-size: 12px; font-weight: 900; transform: rotate(-15deg); box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
    NEW ART
  </div>
  <div>
    <div style="font-size: 26px; font-weight: 900; line-height: 0.9; letter-spacing: -1.5px;">TYPO<br>GRID<br>POSTER</div>
    <div style="font-size: 11px; font-weight: bold; background: #000; color: #ff3366; display: inline-block; padding: 2px 6px; margin-top: 6px; border-radius: 2px;">2026 EVENT</div>
  </div>
  <div style="font-family: sans-serif; font-size: 9px; line-height: 1.3; font-weight: bold; max-width: 60%;">
    BREAKING RULES OF MODERN LAYOUTS AND GRID SYSTEMS.
  </div>
</div>`,
    style: `【视觉主题】极具表现力、打破常规的网页海报（Modern Poster）
【色彩系统】
 - 基础底色：极高对比度的背景（纯黑底色，或极鲜艳纯色背景）。
 - 文本颜色：与背景形成极端反差。
【排版规则】
 - 字体层级：主标题使用极具个性的超大展示字体（Display Font），甚至文字字距收紧、填满容器边缘。正文则配以规整微小的无衬线体，形成极端的字号大小对比。
 - 对齐：倾向于硬切分的网格对齐（CSS Bento Grid 或 Template Areas）或刻意的非对称不对齐。
【组件特征】
 - 容器尺寸：如果是多张海报，每一张必须使用 \`<section class="page">\` 包装，并推荐赋予其明确的版面比例（如 \`.page{width:100%; aspect-ratio:3/4; overflow:hidden;}\`）。
 - 装饰元素：常用几何色块拼贴，以及利用粗细不一的纯色线条（border）切割版面空间。
【布局原则】完全不同于普通网页，将屏幕视作一张实体画布，排版张力优先于常规阅读流。`,
  },
  {
    id: "ai-console",
    name: "智能控制台",
    category: "科技产品/智能控制台",
    accent: "#7c3aed",
    description:
      "AI 产品控制台，深浅混合界面，模型状态、任务流和提示词面板清晰分区",
    previewHtml: `<div style="font-family: sans-serif; background: #0f172a; padding: 12px; height: 100%; display: flex; gap: 8px; box-sizing: border-box; border: 1px solid #1e293b; border-radius: 8px;">
  <div style="width: 25%; border-right: 1px solid #1e293b; padding-right: 6px; display: flex; flex-direction: column; gap: 6px;">
    <div style="width: 14px; height: 14px; border-radius: 4px; background: #7c3aed;"></div>
    <div style="height: 4px; width: 100%; background: #1e293b; border-radius: 1px;"></div>
    <div style="height: 4px; width: 70%; background: #1e293b; border-radius: 1px;"></div>
  </div>
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-size: 10px; font-weight: bold; color: #cbd5e1;">Model Panel</span>
        <span style="font-size: 8px; color: #34d399;">● Online</span>
      </div>
      <div style="background: #1e293b; padding: 4px; border-radius: 4px; font-size: 9px; color: #38bdf8; font-family: monospace;">Claude 3.5 Sonnet</div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-end; height: 16px;">
      <div style="width: 15%; height: 30%; background: #7c3aed; border-radius: 1px;"></div>
      <div style="width: 15%; height: 60%; background: #7c3aed; border-radius: 1px;"></div>
      <div style="width: 15%; height: 45%; background: #7c3aed; border-radius: 1px;"></div>
      <div style="width: 15%; height: 80%; background: #7c3aed; border-radius: 1px;"></div>
      <div style="width: 15%; height: 95%; background: #7c3aed; border-radius: 1px;"></div>
    </div>
  </div>
</div>`,
    style: `【视觉主题】面向 AI 产品的专业控制台，兼具实验室感与可操作性
【色彩系统】
 - 基础底色：冷白 #f8fafc 或深灰 #0f172a；不要做单纯黑底。
 - 文本颜色：主文本 #0f172a / #f8fafc，次要文本 #64748b。
 - 强调色：紫色 #7c3aed 与青色 #06b6d4，用于状态、进度与关键按钮。
【排版规则】
 - 字体：现代无衬线体，代码、模型名、参数值使用等宽字体。
 - 层级：顶部任务目标清晰，参数标签小而精确，结果区域保持高可读性。
【组件特征】
 - 面板：左侧导航 / 中央工作流 / 右侧参数检查器三栏结构，边框细、圆角 10-12px。
 - 状态：使用小型状态点、进度条、token 计数、运行日志块，不要空白图表。
【布局原则】适合 AI 工作台、模型评测、自动化流程页面；强调“可控、可审计、可复用”。`,
  },
  {
    id: "blueprint-tech",
    name: "蓝图科技",
    category: "科技产品/蓝图架构",
    accent: "#2563eb",
    description: "工程蓝图风，细网格、结构线、系统架构 and 模块说明特别清晰",
    previewHtml: `<div style="font-family: sans-serif; background: #08111f; color: #22d3ee; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #112640; border-radius: 8px; position: relative; background-image: radial-gradient(rgba(37,99,235,0.15) 1px, transparent 1px); background-size: 10px 10px;">
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(34,211,238,0.2); padding-bottom: 4px; margin-bottom: 8px;">
      <span style="font-size: 10px; font-weight: bold; letter-spacing: 1px;">ARCHITECT-v2</span>
      <span style="font-size: 8px; color: rgba(34,211,238,0.5);">GRID: 10px</span>
    </div>
    <div style="display: flex; gap: 8px; align-items: center; margin-top: 10px;">
      <div style="border: 1px solid #22d3ee; border-radius: 4px; padding: 4px 6px; font-size: 9px; font-family: monospace;">Module A</div>
      <span style="font-size: 10px; color: rgba(34,211,238,0.5);">━━━━▶</span>
      <div style="border: 1px dashed #22d3ee; border-radius: 4px; padding: 4px 6px; font-size: 9px; font-family: monospace;">Module B</div>
    </div>
  </div>
  <div style="font-size: 9px; color: rgba(34,211,238,0.5); text-align: right;">SYSTEM TOPOLOGY SCHEMA</div>
</div>`,
    style: `【视觉主题】工程蓝图与系统架构说明，理性、清晰、技术可信
【色彩系统】
 - 基础底色：深海军蓝 #08111f 或冷白 #f8fbff。
 - 网格线：rgba(37,99,235,0.12) 的细线，不要过密。
 - 强调色：科技蓝 #2563eb，辅助色青色 #22d3ee。
【排版规则】
 - 字体：标题使用几何无衬线体，技术标签和编号使用等宽字体。
 - 层级：一级标题简短，模块标题用编号，正文说明控制在 2-3 行内。
【组件特征】
 - 模块：架构卡、连接线、编号节点、接口表、流程箭头都用 CSS 边框和网格实现。
 - 图示：可用纯 HTML/CSS 绘制流程图和系统拓扑，禁止依赖图片占位。
【布局原则】适合技术方案、产品架构、API 能力介绍；视觉像一张可交付的工程说明图。`,
  },
  {
    id: "keynote-cinematic",
    name: "电影发布会",
    category: "演示汇报/发布会",
    accent: "#f59e0b",
    description: "Keynote 式大屏演示，深色舞台、超大标题、强节奏单页信息",
    previewHtml: `<div style="font-family: sans-serif; background: radial-gradient(circle at center, #1b2030 0%, #05070c 100%); color: #fff; padding: 16px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; text-align: center; align-items: center;">
  <div style="font-size: 10px; font-weight: bold; color: #f59e0b; letter-spacing: 2px; text-transform: uppercase;">SPECIAL EVENT</div>
  <div style="margin-top: 12px; margin-bottom: auto;">
    <div style="font-size: 20px; font-weight: 700; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 6px;">ONE MORE THING.</div>
    <div style="font-size: 10px; color: #cbd5e1; font-weight: 300;">The next generation of web publishing starts today.</div>
  </div>
  <div style="font-size: 9px; opacity: 0.5;">LIVE FROM THE THEATER</div>
</div>`,
    style: `【视觉主题】电影级产品发布会幻灯片，适合大屏演讲与发布稿
【色彩系统】
 - 基础底色：深黑蓝 #05070c 或暗灰渐变。
 - 文本颜色：主标题近白 #f8fafc，说明文字 #cbd5e1。
 - 强调色：金色 #f59e0b 或电光蓝 #38bdf8，只用于关键词和页码。
【排版规则】
 - 字体：超大标题，字重 700-800；正文少而有力，行高宽松。
 - 单页限制：每张 slide 只表达一个观点，最多 1 个主标题、1 个副标题、3 个要点。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 视觉：允许大幅背景图、产品剪影、光束式渐变，但文字必须始终清晰。
【布局原则】封面强冲击，内容页大留白，结尾页突出一句总结或行动口号。`,
  },
  {
    id: "consulting-deck",
    name: "咨询汇报",
    category: "演示汇报/咨询顾问",
    accent: "#1d4ed8",
    description: "咨询公司式汇报页，结论先行、矩阵图、分栏和数据证据清楚",
    previewHtml: `<div style="font-family: sans-serif; background: #ffffff; padding: 14px; height: 100%; border: 1px solid #e2e8f0; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #1d4ed8; padding-bottom: 4px; margin-bottom: 8px;">
      <span style="font-size: 11px; font-weight: bold; color: #0f172a;">2x2 Matrix Strategy</span>
      <span style="font-size: 8px; color: #64748b; font-weight: bold;">CONSULTING</span>
    </div>
    <div style="font-size: 10px; font-weight: bold; color: #1d4ed8; margin-bottom: 6px;">Market Attractiveness vs Competency</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
      <div style="background: rgba(29,78,216,0.06); border: 1px solid rgba(29,78,216,0.15); padding: 4px; font-size: 8px; border-radius: 4px;">★ Stars</div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px; font-size: 8px; border-radius: 4px;">? Question</div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 4px; font-size: 8px; border-radius: 4px;">💵 Cash Cow</div>
      <div style="background: rgba(220,38,38,0.05); border: 1px solid rgba(220,38,38,0.1); padding: 4px; font-size: 8px; border-radius: 4px; color: #dc2626;">🚯 Dogs</div>
    </div>
  </div>
  <div style="font-size: 8px; color: #94a3b8; text-align: right;">Page 12 / Source: Industry Research</div>
</div>`,
    style: `【视觉主题】咨询公司董事会汇报，结论先行、结构严谨、证据可追踪
【色彩系统】
 - 基础底色：纯白 #ffffff，辅助背景 #f8fafc。
 - 文本颜色：标题 #111827，正文 #374151，注释 #6b7280。
 - 强调色：商务蓝 #1d4ed8，风险或下降使用克制红 #dc2626。
【排版规则】
 - 字体：现代无衬线体；标题像汇报结论而不是章节名。
 - 层级：每页顶部一行“核心结论”，下方用图表、矩阵或表格证明。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 图表：2x2 矩阵、瀑布图、关键数字、路线图用 HTML/CSS 绘制，表格要有清晰表头。
【布局原则】适合战略汇报、经营复盘、项目方案；不要做花哨动画，重点是专业可信。`,
  },
  {
    id: "startup-pitch",
    name: "创业路演",
    category: "演示汇报/年轻路演",
    accent: "#ff4d8d",
    description: "年轻清爽的 Pitch Deck，故事线、市场机会和产品证据突出",
    previewHtml: `<div style="font-family: sans-serif; background: #171329; color: #fff; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #2d264d; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 10px; font-weight: bold; color: #ff4d8d;">PITCH DECK</span>
    <span style="background: rgba(34,211,238,0.2); color: #22d3ee; font-size: 8px; padding: 1px 5px; border-radius: 4px; font-weight: bold;">SERIES A</span>
  </div>
  <div style="margin-top: 10px; margin-bottom: auto;">
    <div style="font-size: 16px; font-weight: 800; line-height: 1.25; color: #fff;">Disrupting SaaS Workflows</div>
    <div style="font-size: 9px; color: #cbd5e1; margin-top: 4px;">Market Size: $42B / CAGR: 24%</div>
  </div>
  <div style="display: flex; align-items: flex-end; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px;">
    <span style="font-size: 8px; color: #8b5cf6;">Traction Graph 📈</span>
    <span style="font-size: 9px; font-weight: bold; color: #22d3ee;">10x Growth</span>
  </div>
</div>`,
    style: `【视觉主题】年轻创业团队路演，清爽、有冲劲、但仍然可信
【色彩系统】
 - 基础底色：亮白 #ffffff 或深紫灰 #171329。
 - 强调色：玫红 #ff4d8d、靛紫 #8b5cf6、亮青 #22d3ee，单页最多使用两种。
 - 文本颜色：深色背景用 #ffffff / #cbd5e1，浅色背景用 #111827 / #4b5563。
【排版规则】
 - 字体：现代圆润无衬线体，标题短促有力，正文用证据支撑。
 - 单页限制：每页只讲一个路演问题，如痛点、方案、市场、商业模式、增长、团队。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 可使用大号数字、机会卡片、增长曲线、产品 mockup 框、投资亮点标签。
【布局原则】适合融资 BP、Demo Day、创新项目汇报；视觉年轻，但信息结构必须稳。`,
  },
  {
    id: "neon-tech-launch",
    name: "科技产品发布",
    category: "演示汇报/科技发布",
    accent: "#00e5ff",
    description: "高科技发布会风，深色舞台、产品能力、规格参数和路线图清晰",
    previewHtml: `<div style="font-family: monospace; background: #050816; color: #00e5ff; padding: 12px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid rgba(0,229,255,0.2); border-radius: 6px;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(0,229,255,0.2); padding-bottom: 4px;">
    <span style="font-size: 9px; font-weight: bold;">DEVICE::PRO_X1</span>
    <span style="font-size: 9px; color: #8b5cf6;">STATUS: READY</span>
  </div>
  <div style="margin: auto 0; padding: 4px 0;">
    <div style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family: sans-serif;">NEON SPECIFICATIONS</div>
    <div style="font-size: 9.5px; color: #00e5ff; line-height: 1.3;">
      - CPU: 12-Core CyberEngine<br>
      - GPU: RayTrace Ultra v2<br>
      - Memory: 64GB Unified
    </div>
  </div>
  <div style="font-size: 8px; color: rgba(0,229,255,0.5); border-top: 1px dashed rgba(0,229,255,0.2); padding-top: 4px; text-align: right;">v2.04-patch</div>
</div>`,
    style: `【视觉主题】高科技产品发布会，未来感来自结构、节奏和产品中心
【色彩系统】
 - 基础底色：深黑蓝 #050816 或 #08111f。
 - 强调色：电青 #00e5ff、冷蓝 #3b82f6、克制紫 #8b5cf6。
 - 边框与高光：使用细描边和局部高光，禁止大面积刺眼光晕。
【排版规则】
 - 字体：几何无衬线体；参数、版本号、规格值使用等宽字体。
 - 层级：产品名最大，能力模块次之，参数说明必须清晰可读。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：能力芯片、规格矩阵、产品框线、版本路线图可用 HTML/CSS 绘制。
【布局原则】适合 AI、新硬件、SaaS 新功能发布；发布感来自清楚的节奏，不靠随机装饰。`,
  },
  {
    id: "growth-review",
    name: "增长战报",
    category: "演示汇报/增长复盘",
    accent: "#22c55e",
    description: "活跃的数据复盘演示，增长指标、实验结果、行动清单一页讲透",
    previewHtml: `<div style="font-family: sans-serif; background: #ffffff; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 10px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 11px; font-weight: bold; color: #0f172a;">Growth Review</span>
    <span style="font-size: 9px; background: rgba(34,197,94,0.1); color: #22c55e; padding: 2px 6px; border-radius: 12px; font-weight: bold;">+182% QTD</span>
  </div>
  <div style="margin-top: 8px; margin-bottom: auto; display: flex; flex-direction: column; gap: 4px;">
    <div style="font-size: 10px; font-weight: bold; color: #1e293b;">Key Experiment: A/B Checkout V2</div>
    <div style="font-size: 9px; color: #64748b; line-height: 1.3;">Conversion Rate improved from 2.1% to 3.8% with statistical significance.</div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 6px;">
    <span style="font-size: 8px; color: #94a3b8;">Owner: Growth Team</span>
    <span style="font-size: 9px; color: #2563eb; font-weight: bold;">Next Actions ➜</span>
  </div>
</div>`,
    style: `【视觉主题】增长团队复盘战报，积极、清爽、行动导向
【色彩系统】
 - 基础底色：浅色 #f8fafc 或纯白 #ffffff。
 - 强调色：增长绿 #22c55e、行动蓝 #2563eb、提醒橙 #f97316。
 - 语义色：上涨用绿、下降或风险用红 #ef4444，中性指标用灰蓝。
【排版规则】
 - 字体：现代无衬线体，数字使用 tabular-nums 保持对齐。
 - 层级：每页顶部必须有一句结论，下面用指标和实验结果支撑。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：KPI 卡、实验 A/B 对照、漏斗、行动看板、下周计划列表用 CSS 实现。
【布局原则】适合增长复盘、运营周报、营销战报；年轻活跃但必须数据清楚、结论明确。`,
  },
  {
    id: "developer-conf",
    name: "开发者大会",
    category: "演示汇报/技术大会",
    accent: "#38bdf8",
    description: "开发者大会技术分享，深色代码感、架构图、API 示例和路线图并重",
    previewHtml: `<div style="font-family: sans-serif; background: #0b1020; color: #e5e7eb; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #1c274c; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 10px; font-weight: bold; color: #38bdf8; letter-spacing: 0.5px;">DEVCONF 2026</span>
    <span style="font-size: 8px; color: #a78bfa;">TRACK A</span>
  </div>
  <div style="margin-top: 6px; margin-bottom: auto;">
    <div style="font-size: 16px; font-weight: 800; line-height: 1.2; color: #fff; margin-bottom: 6px;">Scalable State with Zustand</div>
    <div style="background: #111827; border-radius: 4px; padding: 4px 6px; font-family: monospace; font-size: 8.5px; color: #a78bfa; border: 1px solid #1f2937;">
      const useStore = create((set) => ({...}))
    </div>
  </div>
  <div style="font-size: 8.5px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px;">Presenter: Antigravity / Senior Architect</div>
</div>`,
    style: `【视觉主题】开发者大会技术分享，专业、清晰、带舞台科技感
【色彩系统】
 - 基础底色：深色 IDE 背景 #0b1020，辅助面板 #111827。
 - 文本颜色：主文本 #e5e7eb，注释 #94a3b8。
 - 强调色：天空蓝 #38bdf8、紫色 #a78bfa、成功绿 #34d399。
【排版规则】
 - 字体：标题用现代无衬线，代码块与 API 参数使用 JetBrains Mono / Fira Code。
 - 层级：概念标题要短，代码示例必须留足行距并可读。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：终端窗口、代码片段、架构节点、发布路线图、API 请求/响应卡片。
【布局原则】适合技术大会、SDK 发布、工程方案分享；不要把代码塞满整页，观众要能在远处看懂。`,
  },
  {
    id: "project-kickoff-rally",
    name: "项目启动动员",
    category: "演示汇报/项目动员",
    accent: "#f97316",
    description: "启动会动员风，目标、角色、节奏、里程碑和团队士气都要有画面感",
    previewHtml: `<div style="font-family: sans-serif; background: #fff7ed; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #ffedd5; border-radius: 8px;">
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <span style="font-size: 10px; font-weight: bold; color: #f97316; letter-spacing: 0.5px;">🚀 KICKOFF MEETING</span>
    <span style="font-size: 9px; font-weight: bold; color: #0ea5e9;">Sprint #01</span>
  </div>
  <div style="margin-top: 8px; margin-bottom: auto;">
    <div style="font-size: 15px; font-weight: 800; line-height: 1.25; color: #1f2937; margin-bottom: 6px;">攻坚行动：排版引擎升级</div>
    <div style="display: flex; flex-direction: column; gap: 3px; font-size: 9px; color: #4b5563;">
      <div>☑ 确立里程碑：2周内核心跑通</div>
      <div>☐ 团队承诺：零阻塞，高协同</div>
    </div>
  </div>
  <div style="font-size: 8.5px; color: #f97316; font-weight: bold; text-align: right; border-top: 1px dashed #fed7aa; padding-top: 6px;">目标：完美交付 🎯</div>
</div>`,
    style: `【视觉主题】项目启动会与团队动员，热烈、有方向感、带行动召集感
【色彩系统】
 - 基础底色：暖白 #fff7ed 或深色 #1c1917，避免传统公文蓝。
 - 强调色：活力橙 #f97316、琥珀黄 #f59e0b、清爽蓝 #0ea5e9。
 - 文本颜色：标题 #1f2937 或 #ffffff，正文 #4b5563 或 #d6d3d1。
【排版规则】
 - 字体：标题要有力量，短句化；正文使用短段落和行动列表。
 - 叙事顺序：为什么做 / 要做到什么 / 谁负责 / 怎么推进 / 第一周行动。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：目标旗帜、角色卡、里程碑跑道、启动清单、风险护栏、团队承诺墙。
【布局原则】适合 Kickoff、专项行动、攻坚项目启动；氛围要鼓舞人，但不要变成鸡血海报。`,
  },
  {
    id: "roadmap-planning",
    name: "项目路线图",
    category: "演示汇报/项目规划",
    accent: "#6366f1",
    description: "规划路线图风，阶段目标、依赖关系、优先级 and 资源安排清晰",
    previewHtml: `<div style="font-family: sans-serif; background: #f8fafc; padding: 12px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">
    <span style="font-size: 11px; font-weight: bold; color: #0f172a;">Project Roadmap</span>
    <span style="font-size: 8.5px; color: #6366f1; font-weight: bold;">2026 OKR</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 6px; margin-bottom: auto;">
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 8.5px; color: #64748b; width: 20px;">Q1</span>
      <div style="flex: 1; background: #eef2ff; border-radius: 4px; height: 12px; position: relative; overflow: hidden; border: 1px solid #e0e7ff;">
        <div style="width: 70%; background: #6366f1; height: 100%;"></div>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 6px;">
      <span style="font-size: 8.5px; color: #64748b; width: 20px;">Q2</span>
      <div style="flex: 1; background: #ecfdf5; border-radius: 4px; height: 12px; position: relative; overflow: hidden; border: 1px solid #d1fae5;">
        <div style="width: 45%; background: #10b981; height: 100%;"></div>
      </div>
    </div>
  </div>
  <div style="font-size: 8.5px; color: #94a3b8; text-align: right;">Timeline status: On Track</div>
</div>`,
    style: `【视觉主题】项目规划与路线图，清楚、有节奏、能让团队对齐预期
【色彩系统】
 - 基础底色：冷白 #f8fafc 或淡靛蓝 #eef2ff。
 - 强调色：靛蓝 #6366f1、蓝 #2563eb、薄荷绿 #10b981。
 - 状态色：已完成用绿，进行中用蓝，风险用橙，阻塞用红。
【排版规则】
 - 字体：现代无衬线体，阶段名称要短，说明文字不超过两行。
 - 结构：用季度/月度/阶段分栏，所有里程碑必须有时间、负责人或交付物。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：时间轴、泳道图、优先级矩阵、资源看板、依赖箭头、关键决策点。
【布局原则】适合项目计划、产品路线图、OKR 拆解；风格轻快但必须可执行。`,
  },
  {
    id: "project-retro",
    name: "项目总结复盘",
    category: "演示汇报/项目总结",
    accent: "#14b8a6",
    description: "项目复盘风，结果、经验、问题、改进动作一屏说清，避免流水账",
    previewHtml: `<div style="font-family: sans-serif; background: #ffffff; padding: 14px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 10.5px; font-weight: bold; color: #0f172a;">Retro: Engine Upgrade</span>
    <span style="font-size: 9px; background: rgba(20,184,166,0.1); color: #14b8a6; padding: 1px 6px; border-radius: 10px; font-weight: bold;">COMPLETE</span>
  </div>
  <div style="display: flex; gap: 10px; margin: auto 0; padding: 4px 0;">
    <div style="flex: 1; border-left: 2px solid #ef4444; padding-left: 6px;">
      <div style="font-size: 8px; color: #ef4444;">Before (Lags)</div>
      <div style="font-size: 12px; font-weight: bold; color: #374151;">1.2s Render</div>
    </div>
    <div style="flex: 1; border-left: 2px solid #14b8a6; padding-left: 6px;">
      <div style="font-size: 8px; color: #14b8a6;">After (Boost)</div>
      <div style="font-size: 12px; font-weight: bold; color: #111827;">0.1s Fast</div>
    </div>
  </div>
  <div style="font-size: 9px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 6px;">Key Lesson: Decouple CM Re-render extensions.</div>
</div>`,
    style: `【视觉主题】项目总结与复盘，坦诚、清晰、重视经验沉淀
【色彩系统】
 - 基础底色：白 #ffffff 或浅青灰 #f0fdfa。
 - 强调色：青绿 #14b8a6、深蓝 #1e40af、提醒橙 #f97316。
 - 文本颜色：主文本 #0f172a，次要文本 #64748b。
【排版规则】
 - 字体：干净无衬线体；标题直接写结论，例如“提前 2 周完成核心交付”。
 - 结构：目标回顾 / 结果数据 / 做对了什么 / 暴露了什么 / 下一步改进。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：结果仪表、Before/After 对比、经验卡、问题清单、改进行动表。
【布局原则】适合项目收口、阶段验收、复盘分享；要有真实感，不要只报喜。`,
  },
  {
    id: "annual-story-review",
    previewHtml: `<div style="font-family: sans-serif; background: #171024; color: #fffaf5; padding: 14px; height: 100%; border: 1.5px solid #f59e0b; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245,158,11,0.2); padding-bottom: 6px;">
    <span style="font-size: 10px; color: #f59e0b; font-weight: bold; letter-spacing: 1px;">ANNUAL STORY</span>
    <span style="font-size: 9px; color: #a855f7; font-weight: bold;">2026</span>
  </div>
  <div style="margin-top: 8px;">
    <div style="font-size: 15px; font-weight: 800; color: #fff; line-height: 1.3; margin-bottom: 4px;">攀登者：向光而行，聚沙成塔</div>
    <div style="font-size: 10px; color: #a855f7; font-weight: 600; margin-bottom: 8px;">年度关键词：突破 · 协同 · 坚韧</div>
    <div style="display: flex; gap: 8px; margin-top: 6px;">
      <div style="flex: 1; background: rgba(168,85,247,0.15); padding: 6px; border-radius: 4px; border: 1px solid rgba(168,85,247,0.3);">
        <div style="font-size: 8px; color: #a855f7;">核心战役</div>
        <div style="font-size: 11px; font-weight: 700; color: #fff; margin-top: 2px;">业务出海</div>
      </div>
      <div style="flex: 1; background: rgba(245,158,11,0.15); padding: 6px; border-radius: 4px; border: 1px solid rgba(245,158,11,0.3);">
        <div style="font-size: 8px; color: #f59e0b;">用户规模</div>
        <div style="font-size: 11px; font-weight: 700; color: #fff; margin-top: 2px;">+145%</div>
      </div>
    </div>
  </div>
  <div style="font-size: 9px; color: rgba(255,250,245,0.6); border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px; text-align: right;">致敬每一位努力的伙伴</div>
</div>`,
    name: "年终故事总结",
    category: "演示汇报/年终总结",
    accent: "#a855f7",
    description:
      "年终总结叙事风，年度主题、关键战役、数据成果和团队瞬间更有温度",
    style: `【视觉主题】年终总结与年度回顾，既有成绩单，也有故事和温度
【色彩系统】
 - 基础底色：深紫黑 #171024、暖白 #fffaf5 或柔和渐变。
 - 强调色：紫 #a855f7、金 #f59e0b、玫红 #ec4899。
 - 文本颜色：深色底用 #f8fafc，浅色底用 #111827。
【排版规则】
 - 字体：标题可更有庆典感，正文仍保持清晰；数字使用大号展示。
 - 结构：年度关键词 / 关键战役 / 成果数据 / 团队成长 / 下一年展望。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：年度时间胶片、荣誉墙、关键数字、团队语录、里程碑地图、展望卡片。
【布局原则】适合部门年终、项目年度总结、团队述职；不要像财务报表一样僵硬，要有叙事节奏。`,
  },
  {
    id: "proposal-lab",
    previewHtml: `<div style="font-family: sans-serif; background: #f1f5f9; padding: 14px; height: 100%; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 8px;">
      <span style="background: #0ea5e9; color: #fff; font-size: 8px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">PROPOSAL</span>
      <span style="font-size: 9px; color: #64748b;">Strategy Lab v1.2</span>
    </div>
    <div style="font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.3; margin-bottom: 6px;">全渠道用户数字化增长方案</div>
    <div style="font-size: 10px; color: #475569; line-height: 1.4; background: #fff; padding: 6px; border-radius: 4px; border-left: 3px solid #0ea5e9; margin-bottom: 6px;">
      <strong>核心洞察：</strong>当前存量用户活跃度下滑 15%，急需精细化社群运营切入。
    </div>
  </div>
  <div style="display: flex; gap: 6px; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 8px; color: #64748b;">
    <span>预期 ROI: <strong>3.5x</strong></span>
    <span style="color: #0ea5e9; font-weight: bold;">查看路线图 ➜</span>
  </div>
</div>`,
    name: "方案提案",
    category: "演示汇报/方案提案",
    accent: "#0ea5e9",
    description: "提案实验室风，问题洞察、方案架构、价值证明和落地路径有说服力",
    style: `【视觉主题】方案提案与创意提案，像一间清爽的策略实验室
【色彩系统】
 - 基础底色：白 #ffffff、浅蓝灰 #f1f5f9，允许局部淡色渐变。
 - 强调色：天空蓝 #0ea5e9、青绿 #10b981、亮紫 #8b5cf6。
 - 文本颜色：标题 #0f172a，正文 #475569，注释 #64748b。
【排版规则】
 - 字体：现代无衬线体，标题用“观点句”而不是抽象名词。
 - 结构：问题洞察 / 核心策略 / 方案模块 / 价值证明 / 资源与时间计划。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：洞察卡、方案架构图、价值阶梯、投入产出表、实施路线图、决策页。
【布局原则】适合客户提案、内部方案评审、创新方案推荐；要有设计感，但逻辑必须能说服决策者。`,
  },
  {
    id: "workshop-canvas",
    previewHtml: `<div style="font-family: sans-serif; background: #fffbeb; padding: 14px; height: 100%; border: 1px dashed #eab308; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
    <span style="font-size: 10px; font-weight: bold; color: #854d0e; background: #fef08a; padding: 2px 6px; border-radius: 10px;">⚡ 共创工作坊</span>
    <span style="font-size: 9px; color: #fb7185; font-weight: bold; border: 1px solid #fb7185; padding: 1px 4px; border-radius: 4px;">⏱️ 15 Mins</span>
  </div>
  <div style="font-size: 13px; font-weight: 700; color: #1f2937; margin-bottom: 8px;">议题：如何优化新用户首周体验？</div>
  <div style="display: flex; gap: 6px; margin-top: auto;">
    <div style="flex: 1; background: #fff9db; padding: 6px; border-radius: 2px; box-shadow: 2px 2px 0px rgba(0,0,0,0.05); transform: rotate(-1.5deg);">
      <div style="font-size: 9px; font-weight: bold; color: #854d0e; margin-bottom: 2px;">痛点</div>
      <div style="font-size: 8px; color: #4b5563; scale: 0.95; transform-origin: top left;">注册流程验证码延迟高</div>
    </div>
    <div style="flex: 1; background: #ffe4e6; padding: 6px; border-radius: 2px; box-shadow: 2px 2px 0px rgba(0,0,0,0.05); transform: rotate(1deg);">
      <div style="font-size: 9px; font-weight: bold; color: #9f1239; margin-bottom: 2px;">创意</div>
      <div style="font-size: 8px; color: #4b5563; scale: 0.95; transform-origin: top left;">微信一键快捷登录</div>
    </div>
    <div style="flex: 1; background: #ecfeff; padding: 6px; border-radius: 2px; box-shadow: 2px 2px 0px rgba(0,0,0,0.05); transform: rotate(-0.5deg);">
      <div style="font-size: 9px; font-weight: bold; color: #0891b2; margin-bottom: 2px;">行动</div>
      <div style="font-size: 8px; color: #4b5563; scale: 0.95; transform-origin: top left;">开发快捷登录接口</div>
    </div>
  </div>
</div>`,
    name: "共创工作坊",
    category: "演示汇报/共创工作坊",
    accent: "#eab308",
    description: "工作坊引导风，议程、分组任务、讨论模板和产出看板轻松但有秩序",
    style: `【视觉主题】团队共创工作坊，轻松、开放、适合讨论和协作
【色彩系统】
 - 基础底色：柔和米白 #fffbeb 或浅灰 #f8fafc。
 - 强调色：黄 #eab308、湖蓝 #06b6d4、珊瑚红 #fb7185，作为标签和分组识别。
 - 文本颜色：主文本 #1f2937，辅助文本 #64748b。
【排版规则】
 - 字体：圆润无衬线体，标题友好但不幼稚。
 - 结构：目标 / 议程 / 分组任务 / 讨论模板 / 投票规则 / 输出物。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 组件：分组任务卡、计时器、讨论看板、投票点、问题引导卡、成果模板。
【布局原则】适合工作坊、头脑风暴、需求共创、复盘会；轻松但必须整齐可执行。`,
  },
  {
    id: "editorial-ink-deck",
    previewHtml: `<div style="font-family: Georgia, serif; background: #f1efea; padding: 16px; height: 100%; border: 1px solid #dcdad5; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #0a1f3d; padding-bottom: 4px; margin-bottom: 10px;">
    <span style="font-size: 8px; font-weight: bold; color: #0a1f3d; letter-spacing: 1px; font-family: monospace;">INK & PIXEL</span>
    <span style="font-size: 8px; color: #6e6b64;">CHAPTER 02</span>
  </div>
  <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: auto;">
    <div style="flex: 1.2;">
      <div style="font-size: 16px; font-weight: 700; color: #0a1f3d; line-height: 1.2; margin-bottom: 6px; font-family: Georgia, serif;">重塑阅读的温度与节奏</div>
      <div style="font-size: 10px; color: #2e2d2a; line-height: 1.4; text-align: justify; font-family: sans-serif;">
        在这个信息爆炸的时代，我们试图通过电子杂志的墨水屏质感，为读者寻回那份克制且有呼吸感的深度阅读体验。
      </div>
    </div>
    <div style="flex: 0.8; height: 75px; background: #0a1f3d; border-radius: 2px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      <div style="font-size: 24px; color: #f1efea; font-style: italic; font-weight: bold; opacity: 0.35;">Ink</div>
    </div>
  </div>
  <div style="font-size: 8px; color: #8a867c; border-top: 1px dashed #dcdad5; padding-top: 6px; font-family: monospace; display: flex; justify-content: space-between;">
    <span>ESTABLISHED 2026</span>
    <span>P. 18</span>
  </div>
</div>`,
    name: "电子杂志",
    category: "演示汇报/杂志演讲",
    accent: "#0a1f3d",
    description:
      "电子杂志式网页 PPT，衬线大标题、纸感底色、叙事节奏和图片证据并重",
    style: `【视觉主题】电子杂志 × 电子墨水，像一份可演示的深度杂志专题
【色彩系统】
 - 基础底色：暖纸白 #f1efea、瓷白 #f1f3f5 或沙色 #f0e6d2，整份作品只选一套。
 - 文本颜色：墨黑、深靛蓝或炭灰，避免纯彩色正文。
 - 强调色：只用于页眉、编号、关键词和数据标记，不做大面积装饰。
【排版规则】
 - 字体：大标题使用高质感衬线体，正文使用清晰无衬线体，元数据和编号使用等宽字体。
 - 主题节奏：先规划每页的 hero / light / dark 节奏，每 3-4 页插入封面、章节幕封、大引用或问题页。
 - 单页限制：每页只承载一个叙事动作，长内容拆成“钩子 -> 背景 -> 证据 -> 转折 -> 收束”。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 页面组件：杂志页眉、衬线大标题、导语、数据大字报、图文分栏、图片网格、引用页和收束页。
 - 图片：图片是第一公民，使用 16:10、4:3、3:2、1:1 或 16:9 等标准比例；优先只裁底部，保留顶部和左右关键信息。
【布局原则】适合观点分享、行业观察、人文叙事、产品故事和私享会演讲；克制优于炫技，结构优于装饰。`,
  },
  {
    id: "swiss-presentation-system",
    previewHtml: `<div style="font-family: Inter, Helvetica, sans-serif; background: #fafaf8; padding: 16px; height: 100%; border: 1.5px solid #0a0a0a; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #0a0a0a; padding-bottom: 6px; margin-bottom: 8px;">
    <span style="font-size: 12px; font-weight: 900; color: #002FA7; letter-spacing: -0.5px;">SWISS GRID SYSTEM</span>
    <span style="font-size: 8px; font-family: monospace; color: #737373;">GRID STACK</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: auto;">
    <div style="font-size: 16px; font-weight: 300; color: #0a0a0a; line-height: 1.2; letter-spacing: -0.5px;">
      MAXIMUM INFORMATION.<br>MINIMUM EMBELLISHMENT.
    </div>
    <div style="display: flex; gap: 10px; border-top: 1px solid #d4d4d2; padding-top: 6px;">
      <div style="flex: 1;">
        <div style="font-size: 18px; font-weight: 200; color: #002FA7;">01</div>
        <div style="font-size: 9px; font-weight: 700; color: #0a0a0a; margin-top: 2px;">SYSTEM ORDER</div>
      </div>
      <div style="flex: 1; border-left: 1px solid #d4d4d2; padding-left: 10px;">
        <div style="font-size: 18px; font-weight: 200; color: #0a0a0a;">960</div>
        <div style="font-size: 9px; font-weight: 700; color: #737373; margin-top: 2px;">BASE WIDTH</div>
      </div>
    </div>
  </div>
  <div style="font-size: 8px; font-weight: bold; color: #0a0a0a; letter-spacing: 0.5px; border-top: 1px solid #0a0a0a; padding-top: 4px;">
    SEC. 04 / DATA REPORT
  </div>
</div>`,
    name: "瑞士国际主义",
    category: "演示汇报/瑞士国际主义",
    accent: "#002FA7",
    description:
      "瑞士国际主义网页 PPT，12 栏网格、单一锚点色、直角纯色和超强字号对比",
    style: `【视觉主题】瑞士国际主义系统，信息驱动、冷静、强秩序
【色彩系统】
 - 基础底色：极浅暖白 #fafaf8，辅助灰阶 #f0f0ee / #d4d4d2 / #737373。
 - 文本颜色：近黑 #0a0a0a，高对比优先。
 - 单一锚点色：整份作品只选一个 accent，如克莱因蓝 #002FA7、柠檬黄 #FFD500、柠檬绿 #C5E803 或安全橙 #FF6B35；禁止混用多个高亮色。
【排版规则】
 - 字体：全程无衬线，优先 Inter / Helvetica / Noto Sans SC；代码和标签可用等宽字体。
 - 字号阶梯：越大的字越轻，主标题和 KPI 使用 200-300 字重，小标签和图表标注使用 500-600 字重。
 - 中文标题必须降档处理，避免 2-3 行大标题挤掉图表和正文。
【组件特征】
 - **强制分页容器**：每一页必须使用 \`<section class="slide">\` 包裹，16:9 比例。
 - 版式：优先使用登记过的 12 栏结构，如封面、statement、KPI tower、横向时间线、duo compare、矩阵、系统图、规格表和 image hero。
 - 几何：直角、纯色块、1px 发丝线、点阵或网格背景；禁止渐变、阴影、圆角、玻璃拟态和随意图标堆叠。
 - 图片：主图优先 21:9，多图统一 21:9 或 16:10；同组图片比例、高度、边距和标题样式必须一致。
【布局原则】适合数据汇报、产品方法论、工程分享、年度总结和技术发布；视觉冲击来自网格、留白、字号对比和单一锚点色，而不是装饰。`,
  },
  {
    id: "swiss-grid",
    previewHtml: `<div style="font-family: Helvetica, Inter, sans-serif; background: #ffffff; padding: 16px; height: 100%; border: 1px solid #111111; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; gap: 8px; align-items: flex-start; height: 100%;">
    <div style="flex: 1.2; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="width: 14px; height: 14px; background: #e11d48; margin-bottom: 12px;"></div>
        <div style="font-size: 18px; font-weight: 900; color: #111111; line-height: 1.1; letter-spacing: -0.8px;">SWISS DESIGN SYSTEM</div>
      </div>
      <div style="font-size: 8px; color: #e11d48; font-weight: bold; font-family: monospace;">ZÜRICH 2026</div>
    </div>
    <div style="flex: 0.8; border-left: 1px solid #111111; padding-left: 8px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <div style="font-size: 8px; font-weight: bold; color: #111111; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.5px;">Order / Logic</div>
        <div style="font-size: 9px; color: #666666; line-height: 1.3;">A rigid grid layout provides visual cohesion across complex documents and pages.</div>
      </div>
      <div style="font-size: 8px; color: #111111; font-weight: bold; text-align: right;">P.09</div>
    </div>
  </div>
</div>`,
    name: "瑞士网格",
    category: "设计创意/网格排版",
    accent: "#e11d48",
    description: "Swiss Style，非对称网格、强字号对比、红黑白秩序感",
    style: `【视觉主题】瑞士国际主义平面设计，冷静、秩序、强网格
【色彩系统】
 - 基础底色：纯白 #ffffff 或极浅灰 #f5f5f5。
 - 文本颜色：纯黑 #111111，辅助文字 #666666。
 - 强调色：瑞士红 #e11d48，必须节制使用。
【排版规则】
 - 字体：Helvetica / Inter 风格无衬线体；标题可极大但必须贴合网格。
 - 对齐：严格使用 12 栏或 6 栏网格，允许非对称布局，但边界必须对齐。
【组件特征】
 - 装饰：粗细对比的线条、编号、坐标、栏目标签；禁止柔和阴影和卡通插画。
 - 图片：如使用图片，必须矩形裁切并与网格线对齐。
【布局原则】适合海报、展览介绍、品牌规范、课程封面；信息像海报一样有视觉张力。`,
  },
  {
    id: "bauhaus-composition",
    previewHtml: `<div style="font-family: sans-serif; background: #f5f1e8; padding: 16px; height: 100%; border: 1.5px solid #111111; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-sizing: border-box;">
  <div style="position: absolute; right: -10px; top: -10px; width: 60px; height: 60px; border-radius: 50%; background: #e11d48; opacity: 0.95; z-index: 1;"></div>
  <div style="position: absolute; right: 20px; top: 25px; width: 40px; height: 40px; border-radius: 50%; background: #2563eb; opacity: 0.85; z-index: 1;"></div>
  <div style="position: absolute; right: 10px; top: 60px; width: 50px; height: 10px; background: #facc15; z-index: 2;"></div>
  <div style="position: absolute; left: 0; right: 0; bottom: 35px; height: 4px; background: #111111; z-index: 1;"></div>
  
  <div style="z-index: 3; max-width: 70%;">
    <div style="font-size: 20px; font-weight: 900; color: #111111; line-height: 1.0; letter-spacing: -0.5px; text-transform: uppercase;">BAUHAUS</div>
    <div style="font-size: 11px; font-weight: 700; color: #111111; margin-top: 4px; letter-spacing: 1px;">构成设计</div>
  </div>
  
  <div style="z-index: 3; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="font-size: 8px; color: #111111; font-weight: bold; line-height: 1.2;">
      WEIMAR<br>DESAU
    </div>
    <div style="font-size: 14px; font-weight: 900; color: #111111;">1919</div>
  </div>
</div>`,
    name: "包豪斯构成",
    category: "设计创意/几何构成",
    accent: "#facc15",
    description: "包豪斯几何构成，红黄蓝黑基础形，适合创意海报和展览页",
    style: `【视觉主题】包豪斯平面构成，几何、理性、色块鲜明
【色彩系统】
 - 基础底色：米白 #f5f1e8 或纯白。
 - 主色：红 #e11d48、黄 #facc15、蓝 #2563eb、黑 #111111。
 - 颜色规则：一屏最多使用 3 个主色，避免彩虹化。
【排版规则】
 - 字体：几何无衬线体，标题可使用强字重和垂直/横向排版。
 - 层级：用数字、短词、粗线和几何形建立阅读路径。
【组件特征】
 - 装饰：圆形、半圆、矩形、粗线条和网格块必须服务布局，不要随机漂浮。
 - 容器：海报或多页卡片必须使用 \`<section class="page">\` 包裹并固定比例。
【布局原则】适合艺术展、设计课程、品牌海报；视觉张力优先，但正文仍要可读。`,
  },
  {
    id: "newsroom-feature",
    previewHtml: `<div style="font-family: Georgia, serif; background: #fbfaf7; padding: 14px; height: 100%; border: 1.5px solid #111827; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="text-align: center; border-bottom: 2px double #111827; padding-bottom: 4px; margin-bottom: 8px;">
      <span style="font-size: 12px; font-weight: 900; letter-spacing: 2px; color: #111827; text-transform: uppercase;">THE DAILY CHRONICLE</span>
    </div>
    <div style="font-size: 14px; font-weight: 900; color: #b91c1c; line-height: 1.2; margin-bottom: 6px; text-align: justify;">
      人工智能工作流席卷全球，零代码部署成为新常态
    </div>
    <div style="display: flex; gap: 8px;">
      <div style="flex: 1.2; font-size: 9px; color: #111827; line-height: 1.3; text-align: justify; font-family: serif;">
        <span style="font-size: 14px; font-weight: bold; float: left; line-height: 0.9; margin-right: 2px;">本</span>报讯：随着前端容器化技术成熟，静态 HTML 瞬间生成并导出的能力已极大解放了新一代创作者的生产力。
      </div>
      <div style="flex: 0.8; border-left: 1px solid #cbd5e1; padding-left: 6px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="font-size: 8px; color: #6b7280; font-weight: bold;">【专题事实】</div>
        <div style="font-size: 8px; color: #111827; line-height: 1.2;">超 85% 企业表示将引入生成式提案流程。</div>
      </div>
    </div>
  </div>
  <div style="border-top: 1px solid #111827; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #6b7280;">
    <span>VOL. CLXVIII No. 42</span>
    <span>JUNE 2026</span>
  </div>
</div>`,
    name: "新闻专题",
    category: "媒体内容/新闻专题",
    accent: "#b91c1c",
    description: "严肃新闻专题页，强标题、导语、事实框、时间线和引用证据",
    style: `【视觉主题】严肃新闻与深度专题报道，克制、可信、有现场感
【色彩系统】
 - 基础底色：新闻纸白 #fbfaf7 或纯白。
 - 文本颜色：正文近黑 #111827，说明文字 #6b7280。
 - 强调色：深红 #b91c1c，仅用于栏目、关键事实和链接。
【排版规则】
 - 字体：标题使用强衬线体，正文使用高可读衬线或清晰无衬线。
 - 层级：标题、导语、署名/日期、事实摘要、正文分节必须完整。
【组件特征】
 - 信息块：事实框、关键数字、时间线、人物引用、资料来源列表。
 - 图片：新闻图必须带图注，图注字号小且靠近图片。
【布局原则】适合深度文章、事件复盘、行业报道；不要营销化，不要过度装饰。`,
  },
  {
    id: "documentary-scroll",
    previewHtml: `<div style="font-family: sans-serif; background: #0f0f0f; color: #f5f5f4; padding: 14px; height: 100%; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; background-image: linear-gradient(180deg, #18130f 0%, #0f0f0f 100%);">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <span style="font-size: 8px; color: #a8a29e; letter-spacing: 1px; font-family: monospace;">SCENE 03 / THE SEARCHERS</span>
    <span style="font-size: 8px; color: #f97316; font-weight: bold;">REC ●</span>
  </div>
  <div style="margin: auto 0; text-align: center;">
    <div style="font-size: 15px; font-weight: 300; color: #f5f5f4; letter-spacing: 1px; line-height: 1.4; margin-bottom: 8px;">
      “我们寻找的，往往是那些被时间遗忘的声音。”
    </div>
    <div style="display: inline-block; background: rgba(250,204,21,0.15); color: #facc15; font-size: 9px; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(250,204,21,0.3); font-family: serif; font-style: italic;">
      —— 纪录片《回响》· 镜头 14
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 6px; font-size: 8px; color: #a8a29e; font-family: monospace;">
    <span>TC 10:14:32:08</span>
    <span>4K ULTRA HD</span>
  </div>
</div>`,
    name: "纪录片叙事",
    category: "媒体内容/影像叙事",
    accent: "#f97316",
    description: "纪录片式滚动叙事，暗色剧照感、大段留白、章节镜头语言",
    style: `【视觉主题】纪录片式长页叙事，沉浸、克制、带镜头感
【色彩系统】
 - 基础底色：炭黑 #0f0f0f 或暗棕黑 #18130f。
 - 文本颜色：主文本 #f5f5f4，次要文本 #a8a29e。
 - 强调色：暖橙 #f97316 或胶片黄 #facc15。
【排版规则】
 - 字体：标题使用电影海报式大字号，正文行宽收窄。
 - 节奏：每个章节像一个镜头，使用短标题、导语、关键画面和旁白段落。
【组件特征】
 - 媒体：大图或渐变背景可以 full-bleed，但必须保留文字安全区。
 - 卡片：少用普通卡片，多用字幕条、章节编号、片段引用、时间戳。
【布局原则】适合品牌故事、人物专题、影像项目介绍；强调情绪和叙事推进。`,
  },
  {
    id: "data-command-center",
    previewHtml: `<div style="font-family: Consolas, Monaco, monospace; background: #06111f; color: #e5f2ff; padding: 14px; height: 100%; border: 1px solid #06b6d4; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(6,182,212,0.3); padding-bottom: 6px; margin-bottom: 8px;">
    <div style="display: flex; align-items: center; gap: 4px;">
      <div style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%;"></div>
      <span style="font-size: 9px; font-weight: bold; color: #06b6d4;">CORE DATACENTER</span>
    </div>
    <span style="font-size: 8px; color: rgba(229,242,255,0.5);">SYS_OK</span>
  </div>
  <div style="display: flex; gap: 6px; margin-bottom: auto;">
    <div style="flex: 1.2; background: #0f1b2d; padding: 6px; border-radius: 4px; border: 1px solid rgba(6,182,212,0.15);">
      <div style="font-size: 8px; color: #8aa4bf;">CPU USAGE</div>
      <div style="font-size: 16px; font-weight: bold; color: #06b6d4; margin-top: 2px;">42.8%</div>
      <div style="display: flex; gap: 2px; align-items: flex-end; height: 12px; margin-top: 4px;">
        <div style="height: 4px; flex: 1; background: #06b6d4; opacity: 0.3;"></div>
        <div style="height: 6px; flex: 1; background: #06b6d4; opacity: 0.5;"></div>
        <div style="height: 5px; flex: 1; background: #06b6d4; opacity: 0.4;"></div>
        <div style="height: 8px; flex: 1; background: #06b6d4; opacity: 0.8;"></div>
        <div style="height: 10px; flex: 1; background: #06b6d4;"></div>
      </div>
    </div>
    <div style="flex: 0.8; background: #0f1b2d; padding: 6px; border-radius: 4px; border: 1px solid rgba(6,182,212,0.15); display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="font-size: 8px; color: #8aa4bf;">TASKS</div>
        <div style="font-size: 11px; font-weight: bold; color: #22c55e; margin-top: 2px;">1,248</div>
      </div>
      <div style="font-size: 8px; color: #f97316;">ERRORS: 0</div>
    </div>
  </div>
  <div style="font-size: 8px; color: rgba(229,242,255,0.4); border-top: 1px solid rgba(6,182,212,0.15); padding-top: 4px; display: flex; justify-content: space-between;">
    <span>LOAD: 0.42</span>
    <span>MEM: 12.4GB</span>
  </div>
</div>`,
    name: "数据指挥舱",
    category: "数据分析/实时监控",
    accent: "#06b6d4",
    description: "深色实时数据大屏，指标、地图感网格、告警和趋势模块清晰",
    style: `【视觉主题】实时数据指挥舱，冷静、精密、态势感强
【色彩系统】
 - 基础底色：深蓝黑 #06111f，面板 #0f1b2d。
 - 文本颜色：主文本 #e5f2ff，次要文本 #8aa4bf。
 - 强调色：青色 #06b6d4、绿色 #22c55e、告警橙 #f97316。
【排版规则】
 - 字体：数字必须使用等宽数字；指标标签小而清楚。
 - 层级：核心 KPI 最大，趋势和告警次之，说明文字最弱。
【组件特征】
 - 图表：用 CSS 绘制柱状条、折线近似、环形进度、状态灯和告警列表。
 - 面板：细描边、弱发光、网格背景；禁止复杂空白图表占位。
【布局原则】适合运营监控、设备状态、业务大屏；所有数据模块必须有标题、单位和状态含义。`,
  },
  {
    id: "data-journalism",
    previewHtml: `<div style="font-family: sans-serif; background: #fbfbf8; padding: 14px; height: 100%; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="font-size: 9px; font-weight: bold; color: #0f766e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">DATA FOCUS / 深度解读</div>
    <div style="font-size: 14px; font-weight: 700; color: #1f2937; line-height: 1.3; margin-bottom: 6px;">主要前端渲染模式的耗时对比</div>
    <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px;">
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 8px; color: #4b5563; margin-bottom: 1px;">
          <span>静态 SSR 导出 (M2V)</span>
          <strong>24ms</strong>
        </div>
        <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
          <div style="width: 20%; height: 100%; background: #0f766e; border-radius: 3px;"></div>
        </div>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 8px; color: #4b5563; margin-bottom: 1px;">
          <span>传统 Headless 截图</span>
          <strong>1,480ms</strong>
        </div>
        <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
          <div style="width: 90%; height: 100%; background: #d97706; border-radius: 3px;"></div>
        </div>
      </div>
    </div>
  </div>
  <div style="font-size: 8px; color: #6b7280; border-top: 1px solid #e2e8f0; padding-top: 6px; display: flex; justify-content: space-between;">
    <span>数据来源：W3C Performance API</span>
    <span style="color: #0f766e; font-weight: bold;">效率提升 60x+</span>
  </div>
</div>`,
    name: "数据新闻",
    category: "数据分析/数据叙事",
    accent: "#0f766e",
    description: "数据新闻风，图表与解释并重，适合研究结论和公众传播",
    style: `【视觉主题】数据新闻与解释型可视化，理性但亲近读者
【色彩系统】
 - 基础底色：柔和白 #fbfbf8，图表底色 #f3f4f0。
 - 文本颜色：正文 #1f2937，注释 #6b7280。
 - 强调色：墨绿 #0f766e，辅助色琥珀 #d97706。
【排版规则】
 - 字体：正文高可读，图表标签字号清晰，不要为了密度牺牲可读性。
 - 层级：先给一句结论，再给图表，最后给解释和来源。
【组件特征】
 - 图表：条形图、排名表、对比卡、注释标线用 HTML/CSS 实现。
 - 来源：每个关键数据区域必须预留“数据来源/口径说明”。
【布局原则】适合调研报告、行业数据解读、年度盘点；用故事解释数据，而不是堆仪表盘。`,
  },
  {
    id: "academic-paper",
    previewHtml: `<div style="font-family: Georgia, serif; background: #ffffff; padding: 16px 20px; height: 100%; border: 1px solid #d1d5db; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; text-align: justify;">
  <div>
    <div style="text-align: center; margin-bottom: 8px;">
      <div style="font-size: 13px; font-weight: bold; color: #111827; font-family: Georgia, serif;">A Decoupled Client-Side Rendering Architecture for Markdown</div>
      <div style="font-size: 8px; color: #374151; font-style: italic; margin-top: 2px;">Dr. Alan Turing, DeepMind Team</div>
    </div>
    <div style="border-top: 1px solid #111827; border-bottom: 1px solid #111827; padding: 6px 0; margin-bottom: 8px;">
      <div style="font-size: 8px; font-weight: bold; color: #111827; margin-bottom: 2px;">Abstract</div>
      <div style="font-size: 7.5px; color: #374151; line-height: 1.3; font-family: serif;">
        We present a novel, zero-backend rendering framework that operates entirely within user space sandboxes. By bypassing server dependency layers, compilation speeds scale logarithmically with DOM tree depth.
      </div>
    </div>
    <div style="font-size: 8px; color: #111827; line-height: 1.3; font-family: sans-serif;">
      <strong>1. Introduction</strong><br>
      Let \(D\) represent the sandboxed DOM tree. Traditional rendering approaches introduce a network round-trip overhead of \(O(N)\) where \(N\) is node count...
    </div>
  </div>
  <div style="border-top: 0.5px solid #d1d5db; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 7.5px; color: #6b7280; font-family: sans-serif;">
    <span>arXiv:2606.12874 [cs.SE]</span>
    <span>Page 1 of 12</span>
  </div>
</div>`,
    name: "学术论文",
    category: "文档知识/学术论文",
    accent: "#374151",
    description: "论文式阅读排版，摘要、章节、脚注、图表题注和参考文献清晰",
    style: `【视觉主题】学术论文与研究手稿，严谨、安静、长文友好
【色彩系统】
 - 基础底色：纯白 #ffffff。
 - 文本颜色：正文 #111827，二级信息 #6b7280。
 - 强调色：中性灰 #374151 或深蓝 #1e3a8a，必须克制。
【排版规则】
 - 字体：标题可用衬线体，正文使用高可读衬线或宋体风格。
 - 结构：标题、作者信息、摘要、关键词、章节、图表、参考文献必须层级明确。
【组件特征】
 - 图表：题注必须靠近图表；表格使用细线和清晰表头。
 - 注释：脚注、引用编号、参考文献列表要整齐，不要做装饰卡片。
【布局原则】适合研究摘要、论文预印本、学术报告；优先阅读和打印，不追求强视觉冲击。`,
  },
  {
    id: "product-spec",
    previewHtml: `<div style="font-family: -apple-system, sans-serif; background: #ffffff; padding: 14px; height: 100%; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <span style="font-size: 11px; font-weight: bold; color: #1e293b;">PRD-2026 / 导出引擎规范</span>
      <span style="background: rgba(37,99,235,0.1); color: #2563eb; font-size: 8px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">DRAFT</span>
    </div>
    <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">自由画布 HTML 预览缩略图开发</div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 4px; font-size: 8px;">
      <thead>
        <tr style="border-bottom: 1.5px solid #e2e8f0; text-align: left; color: #64748b;">
          <th style="padding: 3px 0;">需求描述</th>
          <th style="padding: 3px 0; text-align: center;">优先级</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #f1f5f9; color: #334155;">
          <td style="padding: 4px 0;">设计 13 套剩下的缩略图 HTML</td>
          <td style="padding: 4px 0; text-align: center;"><span style="background: #fee2e2; color: #ef4444; padding: 1px 4px; border-radius: 2px; font-weight: bold;">P0</span></td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9; color: #334155;">
          <td style="padding: 4px 0;">验证打包编译没有任何 TypeScript 报错</td>
          <td style="padding: 4px 0; text-align: center;"><span style="background: #fef9c3; color: #ca8a04; padding: 1px 4px; border-radius: 2px; font-weight: bold;">P1</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="font-size: 8px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 4px; text-align: right;">最后修改人: Antigravity</div>
</div>`,
    name: "产品规格书",
    category: "文档知识/产品文档",
    accent: "#2563eb",
    description: "PRD/规格书风格，目录、需求表、状态标签、流程和验收标准完整",
    style: `【视觉主题】产品规格书与 PRD，结构化、可评审、可执行
【色彩系统】
 - 基础底色：白 #ffffff，辅助区块 #f8fafc。
 - 文本颜色：主文本 #111827，说明 #64748b。
 - 强调色：蓝 #2563eb，状态色绿/黄/红用于优先级和风险。
【排版规则】
 - 字体：现代无衬线体；标题编号清楚，表格信息密度适中。
 - 层级：背景、目标、用户故事、需求列表、流程、验收标准必须分区。
【组件特征】
 - 模块：需求表、优先级标签、流程步骤、状态徽标、风险提示和开放问题列表。
 - 文档容器：长文用定宽阅读区；多页输出可使用 \`<section class="page">\`。
【布局原则】适合产品方案、技术规格、项目需求；重点是让团队一眼看懂范围、状态和下一步。`,
  },
];

export const DESIGN_STYLES: DesignStyle[] = RAW_DESIGN_STYLES.map((style) => {
  const metadata = STYLE_METADATA[style.id];
  if (!metadata) {
    throw new Error(`Missing design style metadata: ${style.id}`);
  }
  return { ...style, ...metadata };
});

const TEMPLATE = (
  style: string,
) => `你是一名资深网页设计师、信息架构师与前端工程师。请基于我提供的内容，输出一个**完整、自包含、可直接在浏览器打开**的 HTML 文档。

【设计系统令牌 (Micro Design System)】
${style}

【先理解内容，再设计】
1. 先判断输入内容最适合做成哪种成品：单页网页、长图海报、多页卡片、幻灯片、仪表盘、报告或简历。
2. 保留原始内容里的核心事实、数据、名称和顺序；可以重组表达，但不要编造不存在的案例、数据、引用或品牌背书。
3. 为成品建立清晰的信息层级：主标题 / 导语 / 关键结论 / 分节内容 / 行动或总结。
4. 如果内容很长，优先拆成分区、分屏或分页；不要把所有文字塞进一个拥挤容器。
5. 页面上的每一块内容都必须有明确作用，删除空洞装饰、重复口号和无意义占位。

【防 AI-Slop 与排版硬约束】
1. **中文字体栈优先**：请设置 font-family 为系统级现代中文字体（如 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif）。英文采用 Inter 或 Manrope。
2. **严格执行所选风格**：颜色、字体气质、圆角、边框、阴影、留白、组件形态必须服从上面的设计系统令牌；不要混入其它品牌风格。
3. **8px 基线网格**：margin、padding、gap、line-height、圆角数值尽可能基于 8 像素或 4 像素倍数，保证节奏稳定。
4. **颜色对比度约束**：请确保文字与背景的对比度 ≥ 4.5:1，绝对避免看不清的浅灰字。
5. **视觉去 slop 化**：拒绝滥用无意义的大投影、彩虹渐变、漂浮光球、玻璃拟态堆叠和随机装饰。除非风格明确要求，不要使用极端纯黑大面积背景或过饱和荧光色。
6. **内容真实感**：如果需要补全文案，必须具体、可信、贴近业务场景；严禁出现 "Lorem ipsum"、"您的标题在这里"、"示例文本" 等占位符。
7. **可读性优先**：正文不可被装饰、图片、渐变或固定层遮挡；按钮、标签、卡片内文字不能溢出容器。

【自由画布生产经验】
1. **先列出版式节奏**：生成多页卡片或幻灯片前，先在心里规划每页承担的角色（封面 / 数据 / 证据 / 对比 / 结构 / 收束），避免所有页面长得一样。
2. **单一视觉系统**：一份作品只使用一套主题色、一套字体分工和一组组件规则；不要把多个风格拼贴到同一份 HTML 里。
3. **标准比例**：图片、截图、信息图和卡片槽位使用 21:9、16:10、16:9、4:3、3:2、1:1、3:4 或 9:16 等标准比例，不要复制原图的奇怪宽高比。
4. **图文安全区**：底部页码、导航、说明文字和图片 caption 不得贴近画布边缘；核心内容应明显避开导出裁切区。
5. **演示与低性能兜底**：少量动画可以增强节奏，但所有内容必须在静态状态完整可读；如果写交互脚本，请提供低性能或无脚本时的可阅读状态。

【技术与容器规范（兼容 html-anything 引擎）】
1. 只输出完整 \`<!DOCTYPE html>\` 文档，必须包含 \`<html>\`、\`<head>\`、\`<meta charset="utf-8">\`、\`<meta name="viewport" content="width=device-width, initial-scale=1">\` 与 \`<body>\`。
2. 样式必须内联在 \`<style>\` 中；可以使用 \`<script src="https://cdn.tailwindcss.com"></script>\`，但禁止依赖 React/Vue/ECharts/GSAP/Three.js 等外部 JS 运行时。
3. **导出友好**：所有核心内容必须在初始状态可见，不要依赖 hover、点击、滚动触发动画后才出现；避免视频、音频、iframe、远程 canvas 作为关键信息载体。
4. **资源约束**：图片优先使用稳定的 https URL，必须设置 \`max-width:100%\` 与明确尺寸或比例；不要使用跨域受限图片、登录后图片或会过期的私有链接。
5. **响应式与流式输出**：移动端自适应，所有组件应当使用 Flex/Grid 弹性布局；正文不可横向溢出，长单词/代码需 \`overflow-wrap:anywhere\` 或横向滚动容器。
6. 根据业务场景，如果你设计的是**单页网页/海报长图**：
   允许自然延伸高度，但 \`body\` 必须 \`margin:0\`，且内容请务必包裹在一个主容器内（如 \`<main>\` 或 \`<div>\`），页面主容器建议使用 \`max-width\` 控制阅读宽度。
7. 如果设计是**多页图文/幻灯片/多卡片报告**：
   【强制分页】每一页（每一帧）**必须**独立使用 \`<section class="page">\`（竖版图文）、\`<section class="slide">\`（横版幻灯片）或 \`<section class="card">\`（独立卡片）完全包裹。
   这是为了配合渲染器的导出机制自动切割 PDF，严禁省略包裹层或全部堆叠在一起！
   推荐尺寸示例：
   - 小红书/竖版卡片：\`.page{width:min(100vw,720px);aspect-ratio:3/4;overflow:hidden;margin:0 auto 24px;}\`
   - 9:16 竖版故事：\`.page{width:min(100vw,540px);aspect-ratio:9/16;overflow:hidden;margin:0 auto 24px;}\`
   - 16:9 幻灯片：\`.slide{width:min(100vw,960px);aspect-ratio:16/9;overflow:hidden;margin:0 auto 24px;}\`
8. 如需打印/PDF 友好，请补充 \`@media print\`，确保背景色保留、页面不被浏览器默认边距破坏。
9. 如果页面包含数据展示，优先使用 HTML/CSS 绘制轻量图表、表格、进度条和指标卡；不要依赖外部图表库。
10. 如需少量交互，只能写原生 JavaScript，并保证没有脚本时主要内容仍可阅读。

【输出要求】
直接返回唯一的代码，不要任何前后解释性说明废话，不要以 \`\`\`html 包装代码块。

【我的输入内容与业务诉求】
（在此粘贴你的文章、大纲、数据或描述）`;

// 生成某风格完整可复制的指令
export function buildDesignPrompt(s: DesignStyle): string {
  return TEMPLATE(s.style);
}

/**
 * 为自定义指令生成完整可复制的提示词。
 * 复用内置 TEMPLATE，将自定义 content 作为 style 令牌部分传入。
 */
export function buildCustomDesignPrompt(content: string): string {
  return TEMPLATE(content);
}
