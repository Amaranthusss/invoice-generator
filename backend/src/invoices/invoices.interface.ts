export interface IServicesListServiceData {
  name: string
  brutto: number
  netto: number
  vatAsPercents: number
  vat: number
}
export interface IInvoicesListMonth {
  [monthFolderName: string]: any[]
}

export interface IInvoicesList {
  [year: string]: IInvoicesListMonth
}
