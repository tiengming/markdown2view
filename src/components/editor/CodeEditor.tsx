import { useMemo, useState, useLayoutEffect } from 'react'
import CodeMirror, { EditorView, type Extension } from '@uiw/react-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import type { LanguageDescription } from '@codemirror/language'
import { html } from '@codemirror/lang-html'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  // 编辑器创建后回传滚动容器（.cm-scroller），供滚动联动使用
  onScrollerReady?: (el: HTMLElement) => void
  // 语言模式，默认 markdown
  language?: 'markdown' | 'html'
}

// 浅色主题：白底、软和的语法高亮
const lightTheme = EditorView.theme({
  '&': { backgroundColor: '#ffffff', color: '#1f2937', height: '100%' },
  '.cm-gutters': { backgroundColor: '#fafafa', color: '#9ca3af', border: 'none' },
  // 当前行高亮必须用「半透明」颜色：CodeMirror 的选区层 z-index 为 -1（在文字下方），
  // 若当前行底色不透明，会盖住选区高亮，造成「行内拖拽看似选不中」的错觉
  '.cm-activeLine': { backgroundColor: 'rgba(20,30,60,0.035)' },
  '.cm-activeLineGutter': { backgroundColor: '#f0f1f3' },
  '.cm-scroller': { overflow: 'auto' },
  // 让正文区至少充满滚动容器，空白处也能点击/拖选，并保持文本光标
  '.cm-content': { minHeight: '100%', caretColor: '#1f2937', cursor: 'text' },
  // 选区高亮（聚焦/未聚焦都清晰可见，避免“选不中”的错觉）
  '.cm-selectionBackground': { backgroundColor: '#c7d0f5' },
  '&.cm-focused .cm-selectionBackground': { backgroundColor: '#aab6f0' },
})

// CodeMirror 6 编辑器（框架无关内核，React 封装）
export function CodeEditor({
  value,
  onChange,
  onScrollerReady,
  language = 'markdown',
}: CodeEditorProps) {
  const [codeLangs, setCodeLangs] = useState<LanguageDescription[]>([])

  // 按需加载语言包，并裁剪出常用集合，降低主包体积与运行时代价
  useLayoutEffect(() => {
    if (language === 'markdown') {
      import('@codemirror/language-data').then((m) => {
        const COMMON = [
          'c', 'c++', 'css', 'go', 'html', 'java', 'javascript', 'json', 'jsx', 'markdown',
          'php', 'python', 'rust', 'sql', 'tsx', 'typescript', 'xml', 'yaml', 'shell', 'bash', 'sh', 'vue'
        ]
        const filtered = m.languages.filter((l) =>
          COMMON.includes(l.name.toLowerCase()) || l.alias.some((a) => COMMON.includes(a.toLowerCase()))
        )
        setCodeLangs(filtered)
      })
    }
  }, [language])

  // 缓存扩展：避免每次 render 都生成新的语言扩展与数组，
  // 否则 @uiw/react-codemirror 会在每次输入时重新 reconfigure，导致输入/选择卡顿
  const extensions = useMemo<Extension[]>(() => {
    const langExtension =
      language === 'html'
        ? html()
        : markdown({ base: markdownLanguage, codeLanguages: codeLangs })
    return [langExtension, EditorView.lineWrapping]
  }, [language, codeLangs])

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={lightTheme}
      height="100%"
      style={{ height: '100%', fontSize: 14 }}
      onCreateEditor={(view) => onScrollerReady?.(view.scrollDOM)}
      extensions={extensions}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
      }}
    />
  )
}
