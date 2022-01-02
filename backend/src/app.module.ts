import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ClientsModule } from './clients/clients.module'

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
