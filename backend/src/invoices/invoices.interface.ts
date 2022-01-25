export interface IServicesListServiceData {
  name: string
  brutto: number
  netto: number
  vatAsPercents: number
  vat: number
  fileName: string
  fileCreationDate: Date
}

export interface IInvoicesListMonth {
  [monthFolderName: string]: IServicesListServiceData[]
}

export interface IInvoicesList {
  [year: string]: IInvoicesListMonth
}
