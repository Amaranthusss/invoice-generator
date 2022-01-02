import { Get, Module } from '@nestjs/common'
import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
