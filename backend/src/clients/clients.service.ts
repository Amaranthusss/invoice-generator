import { Injectable } from '@nestjs/common'
import _ from 'lodash'

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

  update(id: number, updatedClient: IClient): void {
    if (!_.some(this.clients, (client: IClient) => client.id === id)) {
      console.error('clients.service / update(): client not found by id', id)
      return
    }

    const clientIndex: number = _.findIndex(
      this.clients,
      (client: IClient) => client.id === id,
    )
    this.clients[clientIndex] = { ...updatedClient }
  }

  delete(id: number): void {
    if (!_.some(this.clients, (client: IClient) => client.id === id)) {
      console.error('clients.service / delete(): client not found by id', id)
      return
    }

    this.clients = _.filter(this.clients, (client: IClient) => client.id !== id)
  }

  find(id: number): IClient {
		console.log(id, _.isNumber(id))
    if (!_.some(this.clients, (client: IClient) => client.id === id)) {
      console.error('clients.service / find(): client not found by id', id)
      return
    }

    return _.find(this.clients, (client: IClient) => client.id === id)
  }

  findAll(): IClient[] {
    return this.clients
  }
}
