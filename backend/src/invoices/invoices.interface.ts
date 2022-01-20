export interface IInvoicesListMonth {
  [monthFolderName: string]: string[]
}

export interface IInvoicesList {
  [year: string]: IInvoicesListMonth
}
