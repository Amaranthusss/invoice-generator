import { FormatObject } from 'devextreme/localization'

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
    email = 'E-Mail',
  }

  export enum ServicesListWords {
    id = 'L.P.',
    name = 'Nazwa usługi',
    vatAsPercents = 'VAT',
    netto = 'Wartość NETTO',
    vat = 'Kwota VAT',
    brutto = 'Wartość BRUTTO',
  }

  export enum InterfaceTexts {
    addRowButton = 'Dodaj',
    editRowButton = 'Edytuj',
    deleteRowButton = 'Usuń',
    sendEmailPopupButton = 'Wyślij e-mail',
    invoiceDateOfIssue = 'Data wystawienia',
    methodOfPaymentTransfer = 'Przelew',
    generateInvoiceButton = 'Wygeneruj fakturę',
    generateInvoicePopupTitle = 'Generowanie faktury',
    saveInvoiceButton = 'Zapisz fakturę',
    confirmDeleteMessage = 'Czy na pewno chcesz usunąć wybrany wiersz?',
  }

  export const DefaultCurrency: string = 'PLN'
  export const VatAsPercents: number = 23
  export const VAT: number = 23
  export const CurrencyFormat: FormatObject = { type: 'currency', precision: 2 }
}
