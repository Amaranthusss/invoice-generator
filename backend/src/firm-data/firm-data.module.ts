import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { FirmDataController } from './firm-data.controller'
import { FirmData } from './firm-data.entity'
import { FirmDataService } from './firm-data.service'

@Module({
  imports: [TypeOrmModule.forFeature([FirmData])],
  controllers: [FirmDataController],
  providers: [FirmDataService],
})
export class FirmDataModule {}
