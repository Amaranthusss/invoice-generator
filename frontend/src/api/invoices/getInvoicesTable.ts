import { AxiosResponse } from 'axios'

import axios from '../axios'

import { IGetTableData } from '../../../../backend/src/invoices/dtos/getTableData.interface'

import { apiRoutes } from '../../constants/routes'

const getInvoicesTable = async (): Promise<AxiosResponse<IGetTableData[]>> => {
  return axios.get(apiRoutes.getInvoicesTable)
}

export default getInvoicesTable
