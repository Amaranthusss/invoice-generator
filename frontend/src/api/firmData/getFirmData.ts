import { AxiosResponse } from 'axios'
import axios from '../axios'

import { apiRoutes } from '../../constants/routes'
import { IFirmDataDto } from '../../../../backend/src/firm-data/dtos/save.interface'

const getFirmData = async (): Promise<AxiosResponse<IFirmDataDto>> => {
  return axios.get(apiRoutes.getFirmData)
}

export default getFirmData
