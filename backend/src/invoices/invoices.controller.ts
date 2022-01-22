import { Body, Controller, Get, Post } from '@nestjs/common'
import Mail from 'nodemailer/lib/mailer'

import { InvoicesService } from './invoices.service'

import { CreateFileDto } from './dtos/createFile.dto'
import { SendEmailDto } from './dtos/sendEmail.dto'

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.invoicesService.findAll()
  }

  @Post()
  async create(@Body() fileOptions: CreateFileDto): Promise<any> {
    return this.invoicesService.createFile(fileOptions)
  }

  @Post()
  async sendEmail(@Body() emailData: SendEmailDto): Promise<Mail.Options> {
    return this.invoicesService.sendMail(emailData)
  }
}
