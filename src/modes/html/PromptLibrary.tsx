import { useMemo, useState } from 'react'
import {
  DESIGN_STYLES,
  OUTPUT_TYPES,
  VISUAL_TONES,
  type DesignStyle,
  type OutputType,
  type VisualTone,
} from '@/data/designPrompts'

interface PromptLibraryProps {
  open: boolean
  onClose: () => void
  onCopy: (style: DesignStyle) => void
}

export function PromptLibrary({ open, onClose, onCopy }: PromptLibraryProps) {
  const [outputType, setOutputType] = useState<OutputType>('幻灯片')
  const [visualTone, setVisualTone] = useState<VisualTone | '全部'>('全部')
  const [showBasic, setShowBasic] = useState(false)

  const filteredStyles = useMemo(() => {
    return DESIGN_STYLES.filter((style) => {
      if (style.outputType !== outputType) return false
      if (visualTone !== '全部' && style.visualTone !== visualTone) return false
      if (!showBasic && style.displayLevel === 'basic') return false
      return true
    })
  }, [outputType, visualTone, showBasic])

  const groupedStyles = useMemo(() => {
    const groups: Record<string, typeof DESIGN_STYLES> = {}
    filteredStyles.forEach((s) => {
      if (!groups[s.visualTone]) groups[s.visualTone] = []
      groups[s.visualTone].push(s)
    })

    return Object.entries(groups).sort((a, b) => {
      return VISUAL_TONES.indexOf(a[0] as VisualTone) - VISUAL_TONES.indexOf(b[0] as VisualTone)
    })
  }, [filteredStyles])

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[85vw] max-w-[1000px] flex-col bg-slate-50 shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <div className="text-lg font-bold text-slate-900">📚 风格指令库</div>
            <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-500">
              <span className="rounded bg-blue-50 px-1.5 text-blue-700 font-semibold flex items-center gap-0.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>工作流</span>
              <span>1. 选一个喜欢的风格</span>
              <span className="text-slate-300">→</span>
              <span>2. 复制提示词发给 AI</span>
              <span className="text-slate-300">→</span>
              <span>3. 将生成的 HTML 贴回系统渲染</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="关闭"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="mb-3 text-xs font-semibold text-slate-400">先选输出类型</div>
          <div className="flex flex-wrap gap-2">
            {OUTPUT_TYPES.map((item) => (
              <button
                key={item}
                onClick={() => setOutputType(item)}
                className={`rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                  outputType === item
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 mb-3 text-xs font-semibold text-slate-400">再选视觉气质</div>
          <div className="flex flex-wrap items-center gap-2">
            {(['全部', ...VISUAL_TONES] as const).map((item) => (
              <button
                key={item}
                onClick={() => setVisualTone(item)}
                className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  visualTone === item
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-[13px] text-slate-500">
              <input
                type="checkbox"
                checked={showBasic}
                onChange={(event) => setShowBasic(event.target.checked)}
              />
              显示基础模板
            </label>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto space-y-10">
            {groupedStyles.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                当前组合下没有推荐风格，可以切换视觉气质，或勾选显示基础模板。
              </div>
            ) : null}
            {groupedStyles.map(([groupName, styles]) => (
              <section key={groupName}>
                <h3 className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-2 text-base font-bold text-slate-800">
                  <span className="h-4 w-1 rounded-full bg-[var(--accent)]"></span>
                  {groupName}气质
                  <span className="text-[13px] font-normal text-slate-400">({styles.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {styles.map((s) => {
                    const subCategory = s.category.includes('/') ? s.category.split('/')[1] : '常规'
                    return (
                      <div
                        key={s.id}
                        className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className="h-3 w-3 shrink-0 rounded-full shadow-inner"
                            style={{ background: s.accent }}
                          />
                          <span className="font-semibold text-slate-900 truncate">{s.name}</span>
                          <span className="ml-auto shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                            {subCategory}
                          </span>
                        </div>
                        <p className="mb-4 flex-1 text-[13px] leading-relaxed text-slate-600">
                          {s.description}
                        </p>
                        <button
                          onClick={() => onCopy(s)}
                          className="accent-bg mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-medium text-white opacity-90 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          复制提示词
                        </button>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
