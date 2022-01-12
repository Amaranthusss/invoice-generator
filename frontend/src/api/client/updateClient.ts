import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/Main/ClientsList/ClientsList.interface'
import { IUpdateClientDto } from '../../../../backend/src/clients/dtos/update.interface'

import { apiRoutes } from '../../constants/apiRoutes'

const updateClient = async (
  options: IUpdateClientDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.patch(apiRoutes.updateClient + `${options.key}`, options)
}

export default updateClient
