import * as pdfjs from 'pdfjs-dist/es5/build/pdf'
import { pdfjsworker } from 'pdfjs-dist/es5/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker

export const getTextFromPDF = async (path: string): Promise<string[]> => {
  const doc = await pdfjs.getDocument(path).promise
  const firstPage = await doc.getPage(1)
  const content = await firstPage.getTextContent()
  const strings = content.items.map((item) => {
    return item.str
  })

  return strings
}
