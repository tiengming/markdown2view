import { downloadBlob } from '../exportImage'

export interface ZipEntry {
  filename: string
  blob: Blob
}

/**
 * Bundle multiple files into a ZIP and trigger download.
 */
export async function downloadAsZip(entries: ZipEntry[], zipName = 'export.zip'): Promise<void> {
  try {
    const { zipSync } = await import('fflate')
    
    const zipData: Record<string, Uint8Array> = {}
    for (const entry of entries) {
      const buffer = await entry.blob.arrayBuffer()
      zipData[entry.filename] = new Uint8Array(buffer)
    }
    
    const zipped = zipSync(zipData)
    const zipBlob = new Blob([zipped], { type: 'application/zip' })
    downloadBlob(zipBlob, zipName)
  } catch (err) {
    // Fallback: sequential download
    console.error('Failed to create ZIP, falling back to sequential download', err)
    for (let i = 0; i < entries.length; i++) {
      downloadBlob(entries[i].blob, entries[i].filename)
      if (i < entries.length - 1) {
        await new Promise(r => setTimeout(r, 300))
      }
    }
  }
}
