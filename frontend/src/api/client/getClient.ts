import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'

import { apiRoutes } from '../../constants/apiRoutes'

const getClient = async (
  key: string
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.get(apiRoutes.getClient + `${key}`)
}

export default getClient
