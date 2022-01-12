import { Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import * as _ from 'lodash'

import { CreateClientDto } from './dtos/create.dtos'

import { Client } from './clients.entity'

@Injectable()
export class ClientsService {
  constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

  async create(newClient: CreateClientDto): Promise<Client> {
    const client: Client = newClient as Client
    client.id = new Date().getUTCMilliseconds()
    const savingClient: Client = this.repo.create(client)

    return this.repo.save(savingClient)
  }

  async update(updateClient: any): Promise<Client> {
    let client: Client = await this.repo.findOne({ key: updateClient.key })
    const mergedClient = _.merge(client, updateClient)

    return this.repo.save(mergedClient)
  }

  async delete(key: string): Promise<Client> {
    const client: Client = await this.repo.findOne({ key })

    return this.repo.remove(client)
  }

  async find(key: string): Promise<Client> {
    const client: Client = await this.repo.findOne({ key })

    if (_.isEmpty(client)) {
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
