import { Injectable } from '@nestjs/common'
import * as fs from 'fs'

import { CreateFileDto } from './dtos/createFile.dtos'

@Injectable()
export class InvoicesService {
  async createFile(fileOptions: CreateFileDto): Promise<void> {
    const filePath: string = `../invoices/${fileOptions.year}/${fileOptions.month}/${fileOptions.fileName}.pdf`

    const writeFileCallback = (error: NodeJS.ErrnoException): void => {
      if (error != null) console.error(error)
    }

    fs.writeFile(
      filePath,
      fileOptions.base64,
      { encoding: 'base64' },
      writeFileCallback,
    )
  }
}
