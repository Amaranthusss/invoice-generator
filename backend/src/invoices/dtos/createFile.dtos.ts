import { IsString, IsBase64 } from 'class-validator'

export class CreateFileDto {
  @IsString()
  year: string
  @IsString()
  month: string
  @IsString()
  fileName: string
  @IsBase64()
  fileDoc: string
}
