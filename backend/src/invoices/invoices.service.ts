import { Injectable } from '@nestjs/common'
import fs from 'fs'

import { CreateFileDto } from './dtos/createFile.dtos'

@Injectable()
export class InvoicesService {
  async createFile(fileOptions: CreateFileDto): Promise<void> {
    const writeFileCallback = (error: NodeJS.ErrnoException): void => {
      console.error(error)
    }
    const filePath: string = `../invoices/${fileOptions.year}/${fileOptions.month}/${fileOptions.fileName}.pdf`

    fs.writeFile(
      filePath,
      fileOptions.fileDoc,
      { encoding: 'base64' },
      writeFileCallback,
    )
  }
}
