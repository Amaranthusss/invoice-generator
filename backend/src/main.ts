import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.useStaticAssets(join(__dirname, '../../frontend/build'))
  app.setBaseViewsDir(join(__dirname, '../../frontend/build'))
  app.setViewEngine('hbs')
	app.enableCors()

  await app.listen(5000)
}
bootstrap()
