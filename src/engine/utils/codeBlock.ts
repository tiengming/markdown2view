import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import cpp from 'highlight.js/lib/languages/cpp'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import { esc } from './helpers'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('css', css)
hljs.registerLanguage('go', go)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('python', python)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

const LANGUAGE_ALIASES: Record<string, string> = {
  c: 'cpp',
  'c++': 'cpp',
  html: 'xml',
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  ts: 'typescript',
}

// one-dark 风格 token 色，转成内联样式后复制到富文本目标也能保留高亮。
const HL_COLORS: Record<string, string> = {
  keyword: '#c678dd',
  built_in: '#56b6c2',
  type: '#e5c07b',
  literal: '#56b6c2',
  number: '#d19a66',
  string: '#98c379',
  regexp: '#98c379',
  comment: '#7f848e',
  doctag: '#7f848e',
  meta: '#7f848e',
  title: '#61afef',
  attr: '#d19a66',
  attribute: '#d19a66',
  variable: '#e06c75',
  tag: '#e06c75',
  name: '#e06c75',
  params: '#abb2bf',
  property: '#e06c75',
  operator: '#56b6c2',
  symbol: '#56b6c2',
  selector: '#e06c75',
  bullet: '#61afef',
  link: '#98c379',
  quote: '#98c379',
  addition: '#98c379',
  deletion: '#e06c75',
  section: '#61afef',
  function: '#61afef',
}

function inlineHighlight(code: string, lang: string): string {
  let out: string
  const language = LANGUAGE_ALIASES[lang] ?? lang
  try {
    out =
      language && hljs.getLanguage(language)
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value
  } catch {
    out = esc(code)
  }

  return out.replace(/class="hljs-([a-z_]+)[^"]*"/g, (_m, c: string) =>
    HL_COLORS[c] ? `style="color:${HL_COLORS[c]}"` : '',
  )
}

export function renderCodeBlock(code: string, lang = 'text'): string {
  const language = lang.trim() || 'text'
  const highlighted = inlineHighlight(code.trimEnd(), language)

  return `<section data-block="code" style="background:rgb(30,30,46);color:rgb(205,214,244);padding:14px 16px;border-radius:8px;overflow:hidden;margin:14px 0px;font-size:12.5px;line-height:1.6"><pre data-lang="${esc(language)}" style="margin:0px;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;font-family:SFMono-Regular,Consolas,Monaco,monospace"><code style="background:none;color:inherit;padding:0;font-size:inherit;font-family:inherit;white-space:inherit;overflow-wrap:inherit;word-break:inherit">${highlighted || '&nbsp;'}</code></pre></section>`
}
