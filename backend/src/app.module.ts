import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { InvoicesModule } from './invoices/invoices.module'
import { ClientsModule } from './clients/clients.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    InvoicesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `./database/${process.env.APP_DATABASE}`,
      synchronize: true, //ToDo: False for production
      entities: ['**/*.entity.js'],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
