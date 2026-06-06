import { DESIGN_STYLES, type DesignStyle } from '@/data/designPrompts'

interface PromptLibraryProps {
  open: boolean
  onClose: () => void
  // 复制某风格指令后回调（用于 Toast 反馈）
  onCopy: (style: DesignStyle) => void
}

// Prompt 指令库：右侧滑出抽屉，列出设计风格 prompt，点击「复制指令」即可拿到完整 prompt
// 发给外部 AI 生成 HTML。本系统不内置 AI，只负责「选指令 → 复制 → 回填渲染」。
export function PromptLibrary({ open, onClose, onCopy }: PromptLibraryProps) {
  return (
    <>
      {/* 遮罩 */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* 抽屉 */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[420px] max-w-[90vw] flex-col bg-white shadow-2xl transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div>
            <div className="text-base font-semibold text-gray-900">Prompt 指令库</div>
            <div className="text-xs text-gray-500">选一个风格 → 复制指令 → 发给 AI 生成 HTML → 回填渲染</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
            aria-label="关闭"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {DESIGN_STYLES.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                  style={{ background: s.accent }}
                />
                <span className="font-medium text-gray-900">{s.name}</span>
                <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
                  {s.category}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>
              <button
                onClick={() => onCopy(s)}
                className="mt-3 w-full rounded-md py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)' }}
              >
                复制指令
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
