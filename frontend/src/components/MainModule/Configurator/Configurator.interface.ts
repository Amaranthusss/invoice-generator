import { Enums } from '../../../constants/enums'

export interface IConfigurator {
  invoiceName: string
  dateOfIssue: string
  methodOfPayment:
    | Enums.InterfaceTexts.methodOfPaymentCash
    | Enums.InterfaceTexts.methodOfPaymentTransfer
  jobDuration: number
  paymentTime: number
}

export const configuratorFullSize: number = 5
