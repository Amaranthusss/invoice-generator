import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/Main/ClientsList/ClientsList.interface'

import { apiRoutes } from '../../constants/apiRoutes'

const getClients = async (): Promise<
  AxiosResponse<IClientsListClientFirmData[]>
> => {
  return axios.get(apiRoutes.getClients)
}

export default getClients
