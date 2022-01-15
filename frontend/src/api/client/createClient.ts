import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'
import { ICreateClientDto } from '../../../../backend/src/clients/dtos/create.interface'

import { apiRoutes } from '../../constants/routes'

const createClient = async (
  options: ICreateClientDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.post(apiRoutes.createClient, options)
}

export default createClient
