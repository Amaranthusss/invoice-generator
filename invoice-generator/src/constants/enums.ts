export namespace Enums {
  export enum DateFormats {
    ShortDate = 'shortDate',
    ShortDateShortTime = 'shortDateShortTime',
  }

  export enum ClientsListWords {
    name = 'Nazwa',
    address = 'Adres siedziby',
    city = 'Kod pocztowy, miasto',
    nip = 'NIP',
  }

  export enum ServicesListWords {
    id = 'L.P.',
    name = 'Nazwa usługi',
    vatAsPercents = 'VAT',
    netto = 'Wartość NETTO',
    vat = 'Kwota VAT',
    brutto = 'Wartość BRUTTO',
  }

  export enum DataGridEditingTexts {
    addRow = 'Dodaj',
    editRow = 'Edytuj',
    deleteRow = 'Usuń',
  }

  export const DefaultCurrency: string = 'PLN'
  export const VatAsPercents: number = 23
}

export const VAT: number = 23
