import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { ClientsService } from './clients.service'

import { ClientDto } from './clients.dtos'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<ClientDto[]> {
    return this.clientsService.findAll()
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<ClientDto> {
    return this.clientsService.find(id)
  }

  @Post()
  async create(@Body() newClient: ClientDto): Promise<void> {
    return this.clientsService.create(newClient)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedClient: ClientDto,
  ): Promise<void> {
    return this.clientsService.update(id, updatedClient)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clientsService.delete(id)
  }
}
