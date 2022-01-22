import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import * as _ from 'lodash'

import { ClientsService } from './clients.service'

import { CreateClientDto } from './dtos/create.dto'

import { Client } from './clients.entity'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientsService.findAll()
  }

  @Get(':key')
  async find(@Param('key') key: string): Promise<Client> {
    return this.clientsService.find(_.toString(key))
  }

  @Post()
  async create(@Body() newClient: CreateClientDto): Promise<Client> {
    return this.clientsService.create(newClient)
  }

  @Patch(':key')
  async update(@Body() updateClient: any): Promise<Client> {
    return this.clientsService.update(updateClient)
  }

  @Delete(':key')
  async delete(@Param('key') key: string): Promise<Client> {
    return this.clientsService.delete(_.toString(key))
  }
}
