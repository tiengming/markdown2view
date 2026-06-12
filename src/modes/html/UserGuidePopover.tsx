import { useState, useEffect } from 'react'

const GUIDE_SEEN_KEY = 'm2v-html-guide-seen'

const STEPS = [
  {
    icon: '📚',
    title: '选择风格并复制指令',
    desc: '打开「指令库」，选择喜欢的风格，点击「复制提示词」',
  },
  {
    icon: '🤖',
    title: '发送给 AI 生成 HTML',
    desc: '将指令 + 你的内容发送给 AI。推荐使用 Claude / ChatGPT / Gemini',
  },
  {
    icon: '📋',
    title: '粘贴 HTML 到编辑器',
    desc: '将 AI 返回的 HTML 代码粘贴到左侧编辑器中，右侧即可实时渲染',
  },
]

export function UserGuidePopover() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof localStorage === 'undefined') return
    const seen = localStorage.getItem(GUIDE_SEEN_KEY)
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  const handleDismiss = (permanent: boolean) => {
    if (typeof localStorage !== 'undefined') {
      // 无论点击哪个按钮，本次都会将其记录，但 true 意味着以后都不再弹
      localStorage.setItem(GUIDE_SEEN_KEY, permanent ? '1' : 'session')
    }
    setVisible(false)
  }

  return (
    <div className="fixed inset-0 z-[35] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-1 text-[17px] font-bold text-slate-900">快速开始</h2>
        <p className="mb-5 text-[13px] text-slate-500">三步生成精美的可视化 HTML 作品</p>

        <div className="space-y-4 mb-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[16px]">
                {step.icon}
              </span>
              <div>
                <div className="text-[14px] font-semibold text-slate-800">
                  <span className="mr-1.5 text-[var(--accent)]">{i + 1}.</span>
                  {step.title}
                </div>
                <div className="mt-0.5 text-[13px] text-slate-500 leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => handleDismiss(true)}
            className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            不再显示
          </button>
          <button
            onClick={() => handleDismiss(false)}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity"
          >
            开始使用
          </button>
        </div>
      </div>
    </div>
  )
}
