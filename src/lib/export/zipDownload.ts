import { downloadBlob } from '../exportImage'

export interface ZipEntry {
  filename: string
  blob: Blob
}

/**
 * 将多个文件打包为 ZIP 并触发下载（利用 fflate 异步 Web-Worker API 实现非阻塞压缩）。
 */
export async function downloadAsZip(entries: ZipEntry[], zipName = 'export.zip'): Promise<void> {
  try {
    const { zip } = await import('fflate')
    
    const zipData: Record<string, Uint8Array> = {}
    
    // 并发异步将所有 Blob 转换为 ArrayBuffer，防止在主线程中依次转换导致界面微卡顿
    await Promise.all(
      entries.map(async (entry) => {
        const buffer = await entry.blob.arrayBuffer()
        zipData[entry.filename] = new Uint8Array(buffer)
      })
    )
    
    return new Promise<void>((resolve, reject) => {
      // 使用 fflate 的异步 zip 接口，它能自动开启后台 Web Worker 进行压缩工作，完全释放主线程
      zip(zipData, (err, zipped) => {
        if (err) {
          reject(err)
        } else {
          const zipBlob = new Blob([zipped], { type: 'application/zip' })
          downloadBlob(zipBlob, zipName)
          resolve()
        }
      })
    })
  } catch (err) {
    // 异常时优雅回退到依次触发单文件下载的方案
    console.error('Failed to create ZIP in worker, falling back to sequential download', err)
    for (let i = 0; i < entries.length; i++) {
      downloadBlob(entries[i].blob, entries[i].filename)
      if (i < entries.length - 1) {
        await new Promise(r => setTimeout(r, 300))
      }
    }
  }
}
