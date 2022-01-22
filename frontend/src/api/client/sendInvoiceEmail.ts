import { AxiosResponse } from 'axios'
import axios from '../axios'

import {
  ISendEmailDto,
  ISendEmailResponseDto,
} from '../../../../backend/src/emails/dtos/send.interface'

import { apiRoutes } from '../../constants/routes'

const sendInvoiceEmail = async (
  options: ISendEmailDto
): Promise<AxiosResponse<ISendEmailResponseDto>> => {
  return axios.post(apiRoutes.sendInvoiceEmail, options)
}

export default sendInvoiceEmail
