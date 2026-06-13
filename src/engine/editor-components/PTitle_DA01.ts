import { leaf } from '@engine/utils/helpers'
import type { ThemeColors } from '@engine/composables/useTheme'

/**
 * PTitle - 段落标题（默认A型01号样式）
 *
 * 编辑器语法（两种写法均可）：
 *   <p-title num="01" title="标题内容" subtitle="副标题" level="1"></p-title>
 *   <p-title num="01" title="标题内容" level="2"></p-title>
 *   <p-title num="01">标题内容</p-title>  ← body 作为 fallback
 *
 * Markdown 语法（自动转换）：
 *   # 一级标题文字       → level=1
 *   ## 二级标题文字      → level=2
 *   ### 三级标题文字     → level=3
 *   #### 四级标题文字    → level=4
 *
 * 属性：
 *   num             - 序号，如 01、02（可选）
 *   title           - 标题文字（可选，优先于 body 内容）
 *   subtitle        - 副标题文字（可选）
 *   color           - 标题文字颜色（可选，默认 rgb(17,24,39)）
 *   num-color       - 序号数字颜色（可选，默认使用主题色）
 *   subtitle-color  - 副标题颜色（可选，默认使用主题色）
 *   level           - 层级：1=一级标题(#)，2=二级标题(##)，3=三级标题(###)，4=四级标题(####)
 *   size            - 尺寸（仅 level=1 有效）：normal=默认，medium=中等，small=缩小版
 *   prefix          - 标题前缀图标，如 🚀、⚡、🔥（可选）
 *   suffix          - 标题后缀图标，如 ✅、💡、→（可选）
 *   hide            - 隐藏元素：num=隐藏数字，line=隐藏CHAPTER和横线（可选）
 */

// ── 组件定义 ──────────────────────────────────────────
export const PTitle = {
  id: 'PTitle_DA01',
  name: '段落标题',
  tag: 'p-title',
  attrs: [
    {
      key: 'num',
      label: '序号',
      required: false,
      default: '',
      description: '序号数字，如 01 / 02 / 03',
    },
    { key: 'title', label: '标题文字', required: false, default: '', description: '标题文字' },
    {
      key: 'subtitle',
      label: '副标题',
      required: false,
      default: '',
      description: '副标题，如英文翻译或补充说明',
    },
    {
      key: 'color',
      label: '标题颜色',
      required: false,
      default: '',
      description: '标题文字颜色，使用颜色单词或十六进制颜色值',
    },
    {
      key: 'num-color',
      label: '序号颜色',
      required: false,
      default: '',
      description: '序号数字的颜色，使用颜色单词或十六进制颜色值',
    },
    {
      key: 'subtitle-color',
      label: '副标题颜色',
      required: false,
      default: '',
      description: '副标题文字颜色，使用颜色单词或十六进制颜色值',
    },
    {
      key: 'level',
      label: '层级',
      required: false,
      default: '1',
      options: ['1', '2', '3', '4'],
      description: '标题层级：1 最大（对应 H1），4 最小（对应 H4）',
    },
    {
      key: 'size',
      label: '尺寸（level=1）',
      required: false,
      default: 'normal',
      options: ['normal', 'medium', 'small'],
      description: '仅 level=1 时生效：normal（默认）/ medium（中等）/ small（缩小）',
    },
    {
      key: 'prefix',
      label: '前缀图标',
      required: false,
      default: '',
      description: '标题前的图标，如 🚀、⚡、🔥，留空则不显示',
    },
    {
      key: 'suffix',
      label: '后缀图标',
      required: false,
      default: '',
      description: '标题后的图标，如 ✅、💡、→，留空则不显示',
    },
    {
      key: 'hide',
      label: '隐藏元素（level=1）',
      required: false,
      default: '',
      options: ['', 'num', 'line'],
      description: '隐藏指定元素：num（隐藏序号）/ line（隐藏章节线及横线），留空则全部显示',
    },
  ],
  example: `<p-title num="01" title="段落标题组件" subtitle="PARAGRAPH TITLE · 分段标题" level="1"></p-title>`,

  render(attrs: Record<string, string>, body: string, t: ThemeColors): string {
    const num = attrs.num || ''
    const title = attrs.title || body // title 属性优先，fallback 到 body
    const subtitle = attrs.subtitle
    const level = parseInt(attrs.level || '1', 10)
    const accent = t.accent
    const titleColor = attrs.color || 'rgb(17,24,39)'
    const numColor = attrs['num-color'] || accent
    const subtitleColor = attrs['subtitle-color'] || accent
    const hasNum = num !== ''
    const prefix = attrs.prefix || ''
    const suffix = attrs.suffix || ''
    const hasPrefix = prefix !== ''
    const hasSuffix = suffix !== ''
    const hide = attrs.hide || ''

    // ── Level 1: 完整章节标题（CHAPTER + 大号装饰数字 + 标题 + 副标题）──
    if (level === 1) {
      const size = attrs.size || 'normal'
      // 根据 size 计算尺寸：normal > medium > small
      let numFontSize: string,
        titleFontSize: string,
        titleMarginTop: string,
        titleMarginLeft: string
      let subtitleMarginLeft: string, subtitleFontSize: string, chapterFontSize: string
      let outerMargin: string
      if (size === 'small') {
        numFontSize = '40px'
        titleFontSize = '20px'
        titleMarginTop = '-40px'
        titleMarginLeft = '34px'
        subtitleMarginLeft = '34px'
        subtitleFontSize = '9px'
        chapterFontSize = '8px'
        outerMargin = '28px 0px 16px'
      } else if (size === 'medium') {
        numFontSize = '48px'
        titleFontSize = '24px'
        titleMarginTop = '-48px'
        titleMarginLeft = '40px'
        subtitleMarginLeft = '40px'
        subtitleFontSize = '10px'
        chapterFontSize = '9px'
        outerMargin = '32px 0px 20px'
      } else {
        numFontSize = '60px'
        titleFontSize = '30px'
        titleMarginTop = '-60px'
        titleMarginLeft = '50px'
        subtitleMarginLeft = '50px'
        subtitleFontSize = '11px'
        chapterFontSize = '10px'
        outerMargin = '36px 0px 24px'
      }

      const numBlock =
        hasNum && hide !== 'num'
          ? `<strong style="display:block;font-size:${numFontSize};line-height:1;color:${numColor};letter-spacing:-3px;white-space:nowrap;opacity:0.25"><span leaf="">${num}</span></strong>`
          : ''
      const titleBlock =
        hasNum && hide !== 'num'
          ? `<strong style="display:block;font-size:${titleFontSize};font-weight:900;color:${titleColor};line-height:1.26;letter-spacing:-0.8px;margin-top:${titleMarginTop};margin-left:${titleMarginLeft}"><span leaf="">${hasPrefix ? prefix + ' ' : ''}${leaf(title)}${hasSuffix ? ' ' + suffix : ''}</span></strong>`
          : `<strong style="display:block;font-size:${titleFontSize};font-weight:900;color:${titleColor};line-height:1.26;letter-spacing:-0.8px"><span leaf="">${hasPrefix ? prefix + ' ' : ''}${leaf(title)}${hasSuffix ? ' ' + suffix : ''}</span></strong>`
      const subtitleHtml = subtitle
        ? `<span style="display:block;margin-left:${hasNum && hide !== 'num' ? subtitleMarginLeft : '0'};font-size:${subtitleFontSize};color:${subtitleColor};font-weight:700;text-transform:uppercase;letter-spacing:1.6px"><span leaf="">${leaf(subtitle)}</span></span>`
        : ''
      const chapterLine =
        hasNum && hide !== 'line'
          ? `<section style="display:flex;align-items:center;margin:0;padding-bottom:12px"><span style="font-size:${chapterFontSize};font-weight:800;color:rgb(148,163,184);letter-spacing:2.6px;text-transform:uppercase;white-space:nowrap"><span leaf="">CHAPTER ${num}</span></span><section style="flex:1;border-top:1px solid rgb(229,231,235);margin:0 0 0 12px;height:0"></section></section>`
          : ''

      return `
<section style="margin:${outerMargin}">
  <section style="clear:both">
    ${chapterLine}
    <section style="margin:0">
      ${numBlock}
      ${titleBlock}
      ${subtitleHtml}
    </section>
  </section>
</section>`
    }

    // ── Level 2: 二级标题（##）──
    if (level === 2) {
      const titleText = `${hasPrefix ? prefix + ' ' : ''}${leaf(title)}${hasSuffix ? ' ' + suffix : ''}`
      if (hasNum) {
        return `
<section style="margin:32px 0px 20px;overflow:hidden">
    <section style="float:left;white-space:nowrap;font-size:24px;font-weight:900;color:${numColor};line-height:1.4;letter-spacing:-0.3px"><span leaf="">${num}</span></section>
    <section style="margin-left:32px;font-size:24px;font-weight:800;color:${titleColor};line-height:1.4;letter-spacing:-0.3px"><span leaf="">${titleText}</span></section>
</section>`
      }
      return `
<section style="margin:32px 0px 20px">
  <section style="font-size:24px;font-weight:800;color:${titleColor};line-height:1.4;letter-spacing:-0.3px"><span leaf="">${titleText}</span></section>
</section>`
    }

    // ── Level 3: 三级标题（###）──
    if (level === 3) {
      const titleText3 = `${hasPrefix ? prefix + ' ' : ''}${leaf(title)}${hasSuffix ? ' ' + suffix : ''}`
      if (hasNum) {
        return `
<section style="margin:28px 0px 16px;overflow:hidden">
    <section style="float:left;white-space:nowrap;font-size:20px;font-weight:900;color:${numColor};line-height:1.45"><span leaf="">${num}</span></section>
    <section style="margin-left:28px;font-size:20px;font-weight:700;color:${titleColor};line-height:1.45"><span leaf="">${titleText3}</span></section>
</section>`
      }
      return `
<section style="margin:28px 0px 16px">
  <section style="font-size:20px;font-weight:700;color:${titleColor};line-height:1.45"><span leaf="">${titleText3}</span></section>
</section>`
    }

    // ── Level 4: 四级标题（####）──
    const titleText4 = `${hasPrefix ? prefix + ' ' : ''}${leaf(title)}${hasSuffix ? ' ' + suffix : ''}`
    if (hasNum) {
      return `
<section style="margin:24px 0px 12px;overflow:hidden">
    <section style="float:left;white-space:nowrap;font-size:16px;font-weight:900;color:${numColor};line-height:1.5"><span leaf="">${num}</span></section>
    <section style="margin-left:24px;font-size:16px;font-weight:700;color:${titleColor};line-height:1.5"><span leaf="">${titleText4}</span></section>
</section>`
    }
    return `
<section style="margin:24px 0px 12px">
  <section style="font-size:16px;font-weight:700;color:${titleColor};line-height:1.5"><span leaf="">${titleText4}</span></section>
</section>`
  },
}
