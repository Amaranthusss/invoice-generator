import { Body, Controller, Post } from '@nestjs/common'

import { InvoicesService } from './invoices.service'

import { CreateFileDto } from './dtos/createFile.dtos'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() fileOptions: CreateFileDto): Promise<void> {
    return this.invoicesService.createFile(fileOptions)
  }
}
