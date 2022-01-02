import { Injectable } from '@nestjs/common'
import * as _ from 'lodash'

import { IClient } from './clients.interface'

@Injectable()
export class ClientsService {
  private clients: IClient[] = [
    { id: 0, name: 'Klient A' },
    { id: 1, name: 'Klient B' },
    { id: 2, name: 'Klient C' },
  ]

  create(newClient: IClient): void {
    if (newClient) {
      const client: IClient = newClient

      client.id = _.size(this.clients)
      this.clients.push(client)
    }
  }

  update(id: string, updatedClient: IClient): void {
    const formattedId: number = _.toNumber(id)

    if (!_.some(this.clients, (client: IClient) => client.id === formattedId)) {
      console.error(
        'clients.service / update(): client not found by id',
        id,
        typeof id,
      )
      return
    }

    const clientIndex: number = _.findIndex(
      this.clients,
      (client: IClient) => client.id === formattedId,
    )
    this.clients[clientIndex] = { ...updatedClient }
  }

  delete(id: string): void {
    const formattedId: number = _.toNumber(id)

    if (!_.some(this.clients, (client: IClient) => client.id === formattedId)) {
      console.error(
        'clients.service / delete(): client not found by id',
        id,
        typeof id,
      )
      return
    }

    this.clients = _.filter(
      this.clients,
      (client: IClient) => client.id !== formattedId,
    )
  }

  find(id: string): IClient {
    const formattedId: number = _.toNumber(id)

    if (!_.some(this.clients, (client: IClient) => client.id === formattedId)) {
      console.error(
        'clients.service / find(): client not found by id',
        id,
        typeof id,
      )
      return {} as IClient
    }

    return _.find(this.clients, (client: IClient) => client.id === formattedId)
  }

  findAll(): IClient[] {
    return this.clients
  }
}
