import { IsNumber, IsString } from 'class-validator'

export class ClientDto {
  @IsNumber()
  id?: number
  @IsString()
  name: string
}
