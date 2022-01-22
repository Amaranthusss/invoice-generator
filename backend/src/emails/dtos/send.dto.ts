import { IsString } from 'class-validator'

export class SendEmailDto {
  @IsString()
  email: string
  @IsString()
  year: string
  @IsString()
  month: string
  @IsString()
  fileName: string
}
