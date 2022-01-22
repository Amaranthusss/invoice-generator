import Mail from 'nodemailer/lib/mailer'

export interface ISendEmailDto {
  email: string
  year: string
  month: string
  fileName: string
}

export interface ISendEmailResponseDto extends Mail.Options {}
