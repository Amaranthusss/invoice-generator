import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'

import { apiRoutes } from '../../constants/routes'

const getClients = async (): Promise<
  AxiosResponse<IClientsListClientFirmData[]>
> => {
  return axios.get(apiRoutes.getClients)
}

export default getClients
