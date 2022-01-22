import { Body, Controller, Post } from '@nestjs/common'
import Mail from 'nodemailer/lib/mailer'

import { SendEmailDto } from './dtos/send.dto'
import { EmailsService } from './emails.service'

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  async sendEmail(@Body() emailData: SendEmailDto): Promise<Mail.Options> {
    return this.emailsService.sendMail(emailData)
  }
}
