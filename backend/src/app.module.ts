import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'

import { InvoicesModule } from './invoices/invoices.module'
import { ClientsModule } from './clients/clients.module'
import { EmailsModule } from './emails/emails.module'
import { FirmDataModule } from './firm-data/firm-data.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule,
    InvoicesModule,
    EmailsModule,
    FirmDataModule,
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
