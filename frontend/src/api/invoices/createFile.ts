import { AxiosResponse } from 'axios'
import axios from '../axios'

import { IClientsListClientFirmData } from '../../components/MainModule/ClientsList/ClientsList.interface'
import { ICreateFileDto } from '../../../../backend/src/invoices/dtos/createFile.interface'

import { apiRoutes } from '../../constants/routes'
import _ from 'lodash'

const createFile = async (
  options: ICreateFileDto
): Promise<AxiosResponse<IClientsListClientFirmData[]>> => {
  if (_.some(options, (param: string) => _.isEmpty(param) || param === '{}')) {
    return undefined as any
  }

  return axios.post(apiRoutes.createFile, options)
}

export default createFile
