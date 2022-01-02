import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as _ from 'lodash'
import { Repository } from 'typeorm'

import { ClientDto } from './clients.dtos'
import { Client } from './clients.entity'

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  create(newClient: ClientDto): Promise<Client> {
    const modifiedClient: Client = newClient as Client
    modifiedClient.id = _.size(this.repo.count())
    const savingClient: Client = this.repo.create(modifiedClient)

    return this.repo.save(savingClient)
  }

  async update(id: number, updatedClient: ClientDto): Promise<Client> {
    const clientToUpdate: Client = await this.repo.findOne(id)
    clientToUpdate.name = updatedClient.name

    return this.repo.save(clientToUpdate)
  }

  async delete(id: number): Promise<Client> {
    const clientToRemove: Client = await this.repo.findOne(id)

    return this.repo.remove(clientToRemove)
  }

  async find(id: number): Promise<Client> {
    const client: Client = await this.repo.findOne(id)

    if (_.isEmpty(Client)) {
      return {} as Client
    }

    return client
  }

  async findAll(): Promise<Client[]> {
    const clients: Client[] = await this.repo.find()

    if (_.isEmpty(clients)) {
      return [] as Client[]
    }

    return clients
  }
}
