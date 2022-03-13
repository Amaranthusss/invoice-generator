import { IsNumber, IsString } from 'class-validator'

export class FirmDataDto {
  @IsString()
  name: string
  @IsString()
  subname: string
  @IsString()
  address: string
  @IsString()
  city: string
  @IsString()
  phone: string
  @IsNumber()
  nip: number
  @IsString()
  bankAcount: string
  @IsString()
  bankName: string
}
