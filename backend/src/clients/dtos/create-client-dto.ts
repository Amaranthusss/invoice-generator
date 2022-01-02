import { IsNumber, IsString } from 'class-validator'

export class CreateClientDto {
  @IsNumber()
  id?: number

  @IsString()
  name: string
}
