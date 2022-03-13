import { Body, Controller, Get, Patch } from '@nestjs/common'
import { FirmDataDto } from './dtos/save.dto'
import { FirmData } from './firm-data.entity'
import { FirmDataService } from './firm-data.service'

@Controller('firm-data')
export class FirmDataController {
  constructor(private readonly firmDataService: FirmDataService) {}

  @Get()
  async find(): Promise<FirmData> {
    return this.firmDataService.find()
  }

  @Patch()
  async update(@Body() updateFirmData: FirmDataDto): Promise<FirmData> {
    return this.firmDataService.update(updateFirmData)
  }
}
