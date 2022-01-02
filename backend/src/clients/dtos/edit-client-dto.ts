import { IsNumber, IsString } from 'class-validator'

export class EditClientDto {
  @IsNumber()
  id: number

  @IsString()
  name: string
}
