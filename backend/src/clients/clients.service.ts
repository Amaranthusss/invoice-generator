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
    const modifiedClient: ClientDto = newClient
    modifiedClient.id = _.size(this.repo.count())
    const savingClient: Client = this.repo.create(modifiedClient)

    return this.repo.save(savingClient)
  }

  async update(updatedClient: Client): Promise<Client> {
    return this.repo.save(updatedClient)
  }

  async delete(id: number): Promise<Client> {
    const clientToRemove: Client = await this.repo.findOne(id)

    return this.repo.remove(clientToRemove)
  }

  find(id: number): Promise<ClientDto> {
    return this.repo.findOne(id)
  }

  findAll(): Promise<ClientDto[]> {
    return this.repo.find()
  }
}
