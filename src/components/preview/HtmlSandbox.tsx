/**
 * Portions of this file are derived from html-anything (https://github.com/nexu-io/open-design),
 * licensed under the Apache License, Version 2.0.
 * Modified by ZhongXiandou/markdown2view contributors.
 */

import { forwardRef, useMemo } from 'react'
import { previewHtml } from '@/lib/extractHtml'

interface HtmlSandboxProps {
  // 原始 HTML（可能含代码块围栏或解释文字，内部会自动提取）
  html: string
  // 用于强制重挂载 iframe 的 key
  refreshKey?: number
  // iframe 加载完成回调
  onLoad?: () => void
}

// iframe 沙箱预览：通过 srcdoc 注入，sandbox 限制权限。
// 移植自 html-anything 的 preview-pane 渲染策略。
export const HtmlSandbox = forwardRef<HTMLIFrameElement, HtmlSandboxProps>(function HtmlSandbox(
  { html, refreshKey = 0, onLoad },
  ref,
) {
  const display = useMemo(() => previewHtml(html), [html])

  if (!display) {
    return (
      <div className="flex h-full items-center justify-center bg-white text-sm text-gray-400">
        粘贴 AI 生成的 HTML，这里会实时渲染
      </div>
    )
  }

  return (
    <iframe
      key={refreshKey}
      ref={ref}
      title="html-preview"
      srcDoc={display}
      sandbox="allow-scripts allow-same-origin"
      className="h-full w-full border-0"
      style={{ background: '#fff' }}
      onLoad={onLoad}
    />
  )
})
