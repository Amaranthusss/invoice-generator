export interface IServicesListServiceData {
  name: string
  brutto: number
  netto: number
  vatAsPercents: number
  vat: number
  key: string | { __KEY__: string }
}
