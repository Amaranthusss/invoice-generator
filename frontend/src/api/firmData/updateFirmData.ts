import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'
import { IFirmDataDto } from '../../../../backend/src/firm-data/dtos/save.interface'

import { apiRoutes } from '../../constants/routes'

const updateFirmData = async (
  options: IFirmDataDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  return axios.patch(apiRoutes.updateFirmData, options)
}

export default updateFirmData
