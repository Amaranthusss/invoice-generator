import { Test, TestingModule } from '@nestjs/testing'
import { FirmDataController } from './firm-data.controller'

describe('FirmDataController', () => {
  let controller: FirmDataController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirmDataController],
    }).compile()

    controller = module.get<FirmDataController>(FirmDataController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
