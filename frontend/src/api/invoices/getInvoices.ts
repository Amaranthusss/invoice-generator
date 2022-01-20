import axios from '../axios'

import { apiRoutes } from '../../constants/routes'

const getInvoices = async (): Promise<any> => {
  return axios.get(apiRoutes.getInvoices)
}

export default getInvoices
