import { useMemo, useRef, useState } from 'react'
import type { ThemeColors } from '@engine'
import { CodeEditor } from '@/components/editor/CodeEditor'
import { useScrollSync } from '@/lib/useScrollSync'
import { renderMarkdown } from '@/lib/render/markdown'
import { ArticlePreview } from './ArticlePreview'
import { useEditorDocSync } from '@/lib/useEditorDocSync'
import { UserGuidePopover } from '@/components/ui/UserGuidePopover'

interface ArticleModeProps {
  markdown: string
  setMarkdown: (markdown: string) => void
  colors: ThemeColors
  onToast: (message: string) => void
}

export function ArticleMode({ markdown, setMarkdown, colors, onToast }: ArticleModeProps) {
  // store ↔ 编辑器双向同步（防抖回写 + 外部变更信号）
  const {
    localValue: localMarkdown,
    debouncedValue: debouncedMarkdown,
    setLocalValue: setLocalMarkdown,
    externalVersion,
  } = useEditorDocSync(markdown, setMarkdown)

  const rendered = useMemo(() => renderMarkdown(debouncedMarkdown, colors), [debouncedMarkdown, colors])
  const editorScrollerRef = useRef<HTMLElement | null>(null)
  const previewScrollRef = useRef<HTMLDivElement>(null)
  const [editorReady, setEditorReady] = useState(0)

  useScrollSync(editorScrollerRef, previewScrollRef, [editorReady])

  return (
    <main className="grid min-h-0 flex-1 grid-cols-2 gap-px bg-gray-200">
      <section className="min-h-0 overflow-hidden bg-white">
        <CodeEditor
          value={localMarkdown}
          onChange={setLocalMarkdown}
          externalVersion={externalVersion}
          onScrollerReady={(el) => {
            editorScrollerRef.current = el
            setEditorReady((n) => n + 1)
          }}
        />
      </section>
      <section className="min-h-0 overflow-hidden bg-gray-50">
        <ArticlePreview
          rendered={rendered}
          markdown={debouncedMarkdown}
          scrollRef={previewScrollRef}
          onToast={onToast}
        />
      </section>
      <UserGuidePopover
        guideKey="m2v-article-guide-seen"
        title="长图文排版 快速开始"
        subtitle="设计优雅的文章并一键复制到各大内容平台"
        steps={[
          {
            icon: '✍️',
            title: '输入长图文内容',
            desc: '在左侧输入 Markdown 文本，系统将以秒级响应渲染为精美的长图文样式。',
          },
          {
            icon: '🎨',
            title: '一键切换主题风格',
            desc: '右侧栏可选择不同的排版主题配色、字体和公式引擎（MathJax/KaTeX）。',
          },
          {
            icon: '📋',
            title: '复制富文本发布',
            desc: '点击预览区右上角「复制富文本」，即可带着全部精美排版粘贴到微信公众号、知乎等编辑器中。',
          },
        ]}
      />
    </main>
  )
}
