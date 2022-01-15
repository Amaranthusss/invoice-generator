import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'
import { IUpdateClientDto } from '../../../../backend/src/clients/dtos/update.interface'

import { apiRoutes } from '../../constants/routes'

const updateClient = async (
  options: IUpdateClientDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.patch(apiRoutes.updateClient + `${options.key}`, options)
}

export default updateClient
