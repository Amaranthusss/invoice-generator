import { Injectable } from '@nestjs/common'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Mail from 'nodemailer/lib/mailer'
import * as nodemailer from 'nodemailer'

import { SendEmailDto } from './dtos/send.dto'

const invoicesFolderPath: string = process.env.APP_INVOICES_FOLDER_PATH

@Injectable()
export class EmailsService {
  async sendMail(emailData: SendEmailDto): Promise<Mail.Options> {
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

    const filePath: string = `${invoicesFolderPath}/${emailData.year}/${emailData.month}/${emailData.fileName}.pdf`
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
      subject: emailData.fileName,
      text: mailMessage,
      attachments: [{ path: filePath, filename: emailData.fileName }],
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
