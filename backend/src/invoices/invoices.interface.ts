import { IServicesListServiceData } from '../../../frontend/src/components/MainModule/ServicesList/ServicesList.interface'

export interface IInvoicesListMonth {
  [monthFolderName: string]: IServicesListServiceData[]
}

export interface IInvoicesList {
  [year: string]: IInvoicesListMonth
}
