import { pdfjsworker } from 'pdfjs-dist/es5/build/pdf.worker.entry'
import * as fs from 'fs'
import * as pdfjs from 'pdfjs-dist/es5/build/pdf'
import * as _ from 'lodash'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker

export const getTextFromPDF = async (path: string): Promise<string[]> => {
  const doc = await pdfjs.getDocument(path).promise
  const firstPage = await doc.getPage(1)
  const content = await firstPage.getTextContent()
  const strings = _.map(content.items, (item) => {
    return item.str
  })

  return strings
}

export const findBrutto = (pdfTexts: string[]): number => {
  return _.toNumber(
    _.replace(
      _.replace(
        _.last(
          _.filter(pdfTexts, (textPool: string) => _.includes(textPool, 'zł')),
        ),
        /zł| /g,
        '',
      ),
      /,/g,
      '.',
    ),
  )
}

export const findTitle = (pdfTexts: string[]): string => {
  let title = _.last(
    _.filter(pdfTexts, (textPool: string, index: number) =>
      _.includes(textPool, 'nr'),
    ),
  )
  const nrIndex: number = _.indexOf(pdfTexts, title)
  title =
    _.size(_.replace(title, / /g, '')) === 2
      ? pdfTexts[nrIndex - 1] + title + pdfTexts[nrIndex + 1]
      : title
  title = _.replace(title, /Faktura|VAT|nr | /g, '')
  return title
}

export const getFileCreationDate = (filePath: string): Date => {
  const { mtime } = fs.statSync(filePath)

  return mtime
}
