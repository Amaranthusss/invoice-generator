import axios from './axios'

import { IClientsListClientFirmData } from '../components/Main/ClientsList/ClientsList.interface'

import { apiRoutes } from '../constants/apiRoutes'

const createClient = async (
  client: IClientsListClientFirmData
): Promise<IClientsListClientFirmData> => {
  return axios.post(apiRoutes.createClient, client)
}

export default createClient
