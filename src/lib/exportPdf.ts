export async function exportElementsToPdf(
  elements: HTMLElement[],
  filename: string,
  opts: { width: number; height: number },
  onProgress?: (current: number, total: number) => void
) {
  // 动态导入以减小主包体积
  const { jsPDF } = await import('jspdf')
  const { domToJpeg } = await import('modern-screenshot')

  // 初始化 PDF（单位 px，尺寸等于传入的 DOM 宽高）
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [opts.width, opts.height],
    compress: true, // 启用压缩
  })

  for (let i = 0; i < elements.length; i++) {
    if (onProgress) onProgress(i + 1, elements.length)
    
    const el = elements[i]
    
    // 使用 3x 缩放确保文字极其清晰
    const dataUrl = await domToJpeg(el, {
      scale: 3,
      backgroundColor: '#ffffff',
      // modern-screenshot 会等待图片加载，我们可以在这里设置 fetch 参数等
    })
    
    if (i > 0) {
      pdf.addPage([opts.width, opts.height], 'portrait')
    }
    
    // 将图片以 1:1 的物理尺寸贴入当前 PDF 页
    pdf.addImage(dataUrl, 'JPEG', 0, 0, opts.width, opts.height)
  }
  
  // 触发浏览器静默下载
  pdf.save(filename)
}
