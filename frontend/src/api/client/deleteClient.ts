import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'
import { IDeleteClientDto } from '../../../../backend/src/clients/dtos/delete.interface'

import { apiRoutes } from '../../constants/apiRoutes'

const deleteClient = async (
  options: IDeleteClientDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.delete(apiRoutes.deleteClient + `${options.key}`)
}

export default deleteClient
