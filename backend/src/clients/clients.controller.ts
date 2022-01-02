import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { IClient } from './clients.interface'
import { ClientsService } from './clients.service'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<IClient[]> {
    return this.clientsService.findAll()
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<IClient> {
    return this.clientsService.find(id)
  }

  @Post()
  async create(@Body() newClient: IClient): Promise<void> {
    return this.clientsService.create(newClient)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedClient: IClient,
  ): Promise<void> {
    return this.clientsService.update(id, updatedClient)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clientsService.delete(id)
  }
}
