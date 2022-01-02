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

import { ClientDto } from './clients.dtos'
import { Client } from './clients.entity'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<ClientDto[]> {
    return this.clientsService.findAll()	
  }

  @Get(':id')
  async find(@Param('id') idAsUrl: string): Promise<ClientDto> {
    const id: number = _.toNumber(idAsUrl)

    return this.clientsService.find(id)
  }

  @Post()
  async create(@Body() newClient: ClientDto): Promise<Client> {
    return this.clientsService.create(newClient)
  }

  @Patch()
  async update(@Body() updatedClient: ClientDto): Promise<Client> {
    return this.clientsService.update(updatedClient as Client)
  }

  @Delete(':id')
  async delete(@Param('id') idAsUrl: string): Promise<Client> {
    const id: number = _.toNumber(idAsUrl)

    return this.clientsService.delete(id)
  }
}
