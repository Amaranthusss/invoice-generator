import { Injectable } from '@nestjs/common'
import * as _ from 'lodash'

import { ClientDto } from './clients.dtos'

@Injectable()
export class ClientsService {
  private clients: ClientDto[] = [
    { id: 0, name: 'Klient A' },
    { id: 1, name: 'Klient B' },
    { id: 2, name: 'Klient C' },
  ]

  create(newClient: ClientDto): void {
    if (newClient) {
      const client: ClientDto = newClient

      client.id = _.size(this.clients)
      this.clients.push(client)
    }
  }

  update(id: string, updatedClient: ClientDto): void {
    const formattedId: number = _.toNumber(id)

    if (
      !_.some(this.clients, (client: ClientDto) => client.id === formattedId)
    ) {
      console.error(
        'clients.service / update(): client not found by id',
        id,
        typeof id,
      )
      return
    }

    const clientIndex: number = _.findIndex(
      this.clients,
      (client: ClientDto) => client.id === formattedId,
    )
    this.clients[clientIndex] = { ...updatedClient }
  }

  delete(id: string): void {
    const formattedId: number = _.toNumber(id)

    if (
      !_.some(this.clients, (client: ClientDto) => client.id === formattedId)
    ) {
      console.error(
        'clients.service / delete(): client not found by id',
        id,
        typeof id,
      )
      return
    }

    this.clients = _.filter(
      this.clients,
      (client: ClientDto) => client.id !== formattedId,
    )
  }

  find(id: string): ClientDto {
    const formattedId: number = _.toNumber(id)

    if (
      !_.some(this.clients, (client: ClientDto) => client.id === formattedId)
    ) {
      console.error(
        'clients.service / find(): client not found by id',
        id,
        typeof id,
      )
      return {} as ClientDto
    }

    return _.find(
      this.clients,
      (client: ClientDto) => client.id === formattedId,
    )
  }

  findAll(): ClientDto[] {
    return this.clients
  }
}
