import { Injectable } from '@nestjs/common'
import * as fsPromises from 'fs/promises'

import { CreateFileDto } from './dtos/createFile.dtos'

@Injectable()
export class InvoicesService {
  async createFile(fileOptions: CreateFileDto): Promise<any> {
    const filePath: string = `../invoices/${fileOptions.year}/${fileOptions.month}/${fileOptions.fileName}.pdf`

    return fsPromises.writeFile(filePath, fileOptions.base64, {
      encoding: 'base64',
    })
  }
}
