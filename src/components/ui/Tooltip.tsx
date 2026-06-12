import { type ReactNode } from 'react'

interface TooltipProps {
  /** 提示文本 */
  text: string
  /** 包裹的子元素 */
  children: ReactNode
  /** 弹出位置 */
  position?: 'top' | 'bottom'
  /** 是否禁用 */
  disabled?: boolean
}

/**
 * 轻量级 CSS-only Tooltip 组件。
 * 用法：<Tooltip text="提示文字"><button>按钮</button></Tooltip>
 */
export function Tooltip({ text, children, position = 'top', disabled }: TooltipProps) {
  if (disabled) return <>{children}</>

  const posClass = position === 'top'
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2'

  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        className={`pointer-events-none absolute z-[9999] ${posClass} whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1.5 text-[12px] leading-tight text-white shadow-lg opacity-0 transition-opacity duration-150 group-hover/tooltip:opacity-100`}
        role="tooltip"
      >
        {text}
      </span>
    </span>
  )
}
