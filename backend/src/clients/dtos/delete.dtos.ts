import { IsString } from 'class-validator'

export class DeleteClientDto {
  @IsString()
  key: string
}
