import { Suspense, lazy, useEffect, useState } from 'react'
import { shouldHydrateDemoContent, useStore } from '@/lib/store'
import { Toast, type ToastState } from '@/components/ui/Toast'
import { ModeTabs } from '@/components/layout/ModeTabs'
import { THEMES } from '@engine/composables/useTheme'

const ArticleMode = lazy(() => import('@/modes/article/ArticleMode').then((m) => ({ default: m.ArticleMode })))
const DocumentMode = lazy(() => import('@/modes/document/DocumentMode').then((m) => ({ default: m.DocumentMode })))
const CardMode = lazy(() => import('@/modes/card/CardMode').then((m) => ({ default: m.CardMode })))
const HtmlMode = lazy(() => import('@/modes/html/HtmlMode').then((m) => ({ default: m.HtmlMode })))

function ModeLoading() {
  return (
    <main className="flex min-h-0 flex-1 items-center justify-center bg-slate-50 text-sm text-slate-400">
      正在加载工作台...
    </main>
  )
}

// 多场景渲染工作台：长图文 / A4 文档 / 小红书卡片 / HTML 可视化。
export default function App() {
  const markdown = useStore((s) => s.markdown)
  const setMarkdown = useStore((s) => s.setMarkdown)
  const html = useStore((s) => s.html)
  const setHtml = useStore((s) => s.setHtml)
  const colors = useStore((s) => s.colors)
  const accent = useStore((s) => s.accent)
  const setTheme = useStore((s) => s.setTheme)
  const mode = useStore((s) => s.mode)
  const setMode = useStore((s) => s.setMode)
  const platform = useStore((s) => s.platform)
  const setPlatform = useStore((s) => s.setPlatform)
  const documentSettings = useStore((s) => s.documentSettings)
  const updateDocumentSettings = useStore((s) => s.updateDocumentSettings)

  // 统一 Toast 反馈
  const [toast, setToast] = useState<ToastState | null>(null)
  const showToast = (message: string) => setToast({ message, key: Date.now() })

  useEffect(() => {
    if (!shouldHydrateDemoContent()) return
    let cancelled = false
    Promise.all([
      import('@/data/demoContent'),
      import('@/data/demoHtml'),
    ]).then(([{ DEMO_CONTENT }, { DEMO_HTML }]) => {
      if (cancelled || !shouldHydrateDemoContent()) return
      setMarkdown(DEMO_CONTENT)
      setHtml(DEMO_HTML)
    })
    return () => {
      cancelled = true
    }
  }, [setMarkdown, setHtml])

  const handleRestoreDemo = () => {
    if (window.confirm('确定要恢复示例文件吗？这将会覆盖你当前所有的输入内容。')) {
      Promise.all([
        import('@/data/demoContent'),
        import('@/data/demoHtml')
      ]).then(([ { DEMO_CONTENT }, { DEMO_HTML } ]) => {
        setMarkdown(DEMO_CONTENT)
        setHtml(DEMO_HTML)
        showToast('已恢复示例文件')
      })
    }
  }


  return (
    <div className="flex h-full flex-col">
      {/* 顶部导航栏 */}
      <header className="app-header relative z-20 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md text-white shadow-sm" style={{ background: 'var(--accent)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
            </div>
            <h1 className="text-[17px] font-bold tracking-tight text-slate-800">
              markdown<span style={{ color: 'var(--accent)' }}>2</span>view
            </h1>
          </div>
          {/* 多模式切换 */}
          <ModeTabs mode={mode} onChange={setMode} />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleRestoreDemo}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            title="恢复默认的示例文件"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            恢复示例
          </button>
          
          <div className="w-px h-4 bg-slate-200" />

          {/* 主题色切换 */}
          <div className="flex items-center gap-1.5">
            {THEMES.map((t) => (
              <button
                key={t.accent}
                title={t.accent}
                onClick={() => setTheme(t.accent, t.dark)}
                className="h-5 w-5 rounded-full border transition-transform hover:scale-110"
                style={{
                  background: t.accent,
                  borderColor: accent === t.accent ? '#111' : 'transparent',
                  outline: accent === t.accent ? '2px solid #1118' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* 主体：按模式渲染 */}
      <Suspense fallback={<ModeLoading />}>
        {mode === 'article' && (
          <ArticleMode
            markdown={markdown}
            setMarkdown={setMarkdown}
            colors={colors}
            onToast={showToast}
          />
        )}
        {mode === 'html' && <HtmlMode html={html} setHtml={setHtml} onToast={showToast} />}
        {mode === 'document' && (
          <DocumentMode
            markdown={markdown}
            setMarkdown={setMarkdown}
            colors={colors}
            settings={documentSettings}
            updateSettings={updateDocumentSettings}
            onToast={showToast}
          />
        )}
        {mode === 'card' && (
          <CardMode
            markdown={markdown}
            setMarkdown={setMarkdown}
            colors={colors}
            platform={platform === 'xiaohongshu' ? platform : 'xiaohongshu'}
            setPlatform={setPlatform}
            onToast={showToast}
          />
        )}
      </Suspense>

      <Toast toast={toast} />
    </div>
  )
}
