import { IsDate, IsNumber, IsString } from 'class-validator'

export class IGetTableDataDto {
  @IsString()
  name: string
  @IsNumber()
  brutto: number
  @IsNumber()
  netto: number
  @IsNumber()
  vatAsPercents: number
  @IsNumber()
  vat: number
  @IsString()
  fileName: string
  @IsString()
  year: string
  @IsString()
  month: string
  @IsDate()
  fileCreationDate: Date
}
