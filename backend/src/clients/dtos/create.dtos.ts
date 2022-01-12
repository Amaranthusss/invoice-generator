import { IsNumber, IsString } from 'class-validator'

export class CreateClientDto {
  @IsString()
  key: string
  @IsString()
  name: string
  @IsString()
  address: string
  @IsString()
  city: string
  @IsNumber()
  nip: number
}
