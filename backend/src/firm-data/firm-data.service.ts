import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as _ from 'lodash'

import { FirmDataDto } from './dtos/save.dto'
import { FirmData } from './firm-data.entity'

@Injectable()
export class FirmDataService {
  constructor(@InjectRepository(FirmData) private repo: Repository<FirmData>) {}

  async find(): Promise<FirmData> {
    const firmData: FirmData = await this.repo.findOne({ id: 1 })

    return firmData
  }

  async update(updateFirmData: FirmDataDto): Promise<FirmData> {
    const firmData: FirmDataDto = await this.repo.findOne({ id: 1 })
    const mergedFirmData: FirmDataDto = _.merge(firmData, updateFirmData)

    return this.repo.save(mergedFirmData)
  }
}
