import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { ClientsModule } from './clients/clients.module'

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/db_2020_01_13.sqlite',
      synchronize: true, //ToDo: False for production
      entities: ['**/*.entity.js'],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
