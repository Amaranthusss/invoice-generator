import { IsString } from 'class-validator'

export class CreateFileDto {
  @IsString()
  year: string
  @IsString()
  month: string
  @IsString()
  fileName: string
  @IsString()
  fileDoc: string
}
