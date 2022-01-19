import { Injectable } from '@nestjs/common'
import fs from 'fs'

import { CreateFileDto } from './dtos/createFile.dtos'

@Injectable()
export class InvoicesService {
  async createFile(fileOptions: CreateFileDto): Promise<void> {
    fs.writeFile(
      `./${fileOptions.fileName}.pdf`,
      fileOptions.fileDoc,
      { encoding: 'base64' },
      (error: NodeJS.ErrnoException): void => {
        console.error(error)
      },
    )
    // const pdfPrinter = new PdfPrinter(fonts)
    // const docDef: TDocumentDefinitions = JSON.parse(fileOptions.fileDoc)
    // docDef.defaultStyle = { font: 'Times' }

    // const doc: PDFKit.PDFDocument = pdfPrinter.createPdfKitDocument(docDef)
    // //`${fileOptions.year}/${fileOptions.month}/${fileOptions.fileName}.pdf`
    // console.log('createFile', fileOptions.fileName)
    // doc.pipe(fs.createWriteStream(`./${fileOptions.fileName}.pdf`))
    // doc.end()
  }
}
