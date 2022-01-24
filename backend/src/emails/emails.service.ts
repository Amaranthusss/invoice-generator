import { Injectable } from '@nestjs/common'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Mail from 'nodemailer/lib/mailer'
import * as fsPromises from 'fs/promises'
import * as nodemailer from 'nodemailer'
import * as _ from 'lodash'

import { SendEmailDto } from './dtos/send.dto'

@Injectable()
export class EmailsService {
  invoicesFolderPath: string = process.env.APP_INVOICES_FOLDER_PATH

  async sendMail(emailData: SendEmailDto): Promise<Mail.Options> {
    const allMonths: string[] = await fsPromises.readdir(
      `${this.invoicesFolderPath}/${emailData.year}`,
    )
    const monthFolderName: string = _.find(
      allMonths,
      (monthFolderName: string) => _.includes(monthFolderName, emailData.month),
    )

    let responseResolve: (
      value: Mail.Options | PromiseLike<Mail.Options>,
    ) => void
    let responseReject: (reason: Error) => void
    const response: Promise<Mail.Options> = new Promise((resolve, reject) => {
      responseResolve = resolve
      responseReject = reject
    })

    const programMail = {
      login: process.env.APP_MAIL_LOGIN,
      password: process.env.APP_MAIL_PASSWORD,
      service: 'gmail',
    }

    const filePath: string = `${this.invoicesFolderPath}/${emailData.year}/${monthFolderName}/${emailData.fileName}.pdf`
    const mailMessage: string =
      'Wiadomość została wygenerowana automatycznie, proszę na nią nie odpowiadać.'
    const mail: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
      nodemailer.createTransport({
        service: programMail.service,
        auth: {
          user: programMail.login,
          pass: programMail.password,
        },
      })

    const mailOptions: Mail.Options = {
      from: programMail.login,
      // to: emailData.email,
      to: 'raksoxardas@gmail.com',
      subject: `Faktura VAT nr ${emailData.fileName}`,
      text: mailMessage,
      attachments: [{ path: filePath, filename: `${emailData.fileName}.pdf` }],
    }

    const mailCallback = (error: Error): void => {
      if (error != null) {
        responseReject(error)
        return
      }
      responseResolve(mailOptions)
    }

    mail.sendMail(mailOptions, mailCallback)

    return response
  }
}
