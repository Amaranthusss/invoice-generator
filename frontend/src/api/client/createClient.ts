import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/Main/ClientsList/ClientsList.interface'
import { ICreateClientDto } from '../../../../backend/src/clients/dtos/create.interface'

import { apiRoutes } from '../../constants/apiRoutes'

const createClient = async (
  options: ICreateClientDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.post(apiRoutes.createClient, options)
}

export default createClient
