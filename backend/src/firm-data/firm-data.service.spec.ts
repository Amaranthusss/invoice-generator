import { Test, TestingModule } from '@nestjs/testing'
import { FirmDataService } from './firm-data.service'

describe('FirmDataService', () => {
  let service: FirmDataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirmDataService],
    }).compile()

    service = module.get<FirmDataService>(FirmDataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
