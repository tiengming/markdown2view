export async function exportElementsToPdf(
  elements: HTMLElement[],
  filename: string,
  opts?: { width: number; height: number },
  onProgress?: (current: number, total: number) => void
) {
  // 动态导入以减小主包体积
  const { jsPDF } = await import('jspdf')
  const { domToJpeg } = await import('modern-screenshot')

  let pdf: any = null

  for (let i = 0; i < elements.length; i++) {
    if (onProgress) onProgress(i + 1, elements.length)
    
    const el = elements[i]
    
    const originalDisplay = el.style.display
    if (originalDisplay === 'none') {
      el.style.display = ''
    }

    // 如果没有传入固定尺寸，就动态读取当前 DOM 的实际宽高
    const w = opts?.width || el.offsetWidth
    const h = opts?.height || el.offsetHeight

    // 使用 3x 缩放确保文字极其清晰
    const dataUrl = await domToJpeg(el, {
      scale: 3,
      backgroundColor: '#ffffff',
      // modern-screenshot 会等待图片加载，我们可以在这里设置 fetch 参数等
    })
    
    if (originalDisplay === 'none') {
      el.style.display = 'none'
    }

    if (!pdf) {
      // 初始化 PDF（单位 px，尺寸等于当前页或传入的 DOM 宽高）
      pdf = new jsPDF({
        orientation: w > h ? 'landscape' : 'portrait',
        unit: 'px',
        format: [w, h],
        compress: true, // 启用压缩
      })
    } else {
      pdf.addPage([w, h], w > h ? 'landscape' : 'portrait')
    }
    
    // 将图片以 1:1 的物理尺寸贴入当前 PDF 页
    pdf.addImage(dataUrl, 'JPEG', 0, 0, w, h)
  }
  
  // 触发浏览器静默下载
  if (pdf) {
    pdf.save(filename)
  }
}
