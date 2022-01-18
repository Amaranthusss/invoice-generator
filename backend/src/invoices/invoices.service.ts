import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces'
import { Injectable } from '@nestjs/common'
const PdfPrinter = require('pdfmake')
const fs = require('fs')

import { CreateFileDto } from './dtos/createFile.dtos'

const fonts: TFontDictionary = {
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
  },
}

@Injectable()
export class InvoicesService {
  async createFile(fileOptions: CreateFileDto): Promise<void> {
    const pdfPrinter = new PdfPrinter(fonts)
    const docDef: TDocumentDefinitions = JSON.parse(fileOptions.fileDoc)
    docDef.defaultStyle = { font: 'Times' }

    const doc: PDFKit.PDFDocument = pdfPrinter.createPdfKitDocument(docDef)
    //`${fileOptions.year}/${fileOptions.month}/${fileOptions.fileName}.pdf`
    console.log('createFile', fileOptions.fileName)
    doc.pipe(fs.createWriteStream(`./${fileOptions.fileName}.pdf`))
    doc.end()
  }
}
