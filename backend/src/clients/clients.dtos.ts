import { IsNumber, IsString } from 'class-validator'

export class ClientDto {
  @IsString()
  name: string
}
