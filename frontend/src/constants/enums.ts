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
    orderingData = 'Dane zamawiajacych',
  }

  export enum ServicesListWords {
    id = 'L.P.',
    name = 'Nazwa usługi',
    vatAsPercents = 'VAT',
    netto = 'Wartość NETTO',
    vat = 'Kwota VAT',
    brutto = 'Wartość BRUTTO',
  }

  export const InterfaceTexts = {
    confirmButton: 'Potwierdź',
    addRowButton: 'Dodaj',
    editRowButton: 'Edytuj',
    deleteRowButton: 'Usuń',
    cancelButton: 'Cofnij',
    search: 'Szukaj...',
    confirmDeleteMessage: 'Czy na pewno chcesz usunąć wybrany wiersz?',

    savedInvoiceFileSuccess: 'Utworzono plik PDF z fakturą, gratulacje! 😊',
    savedInvoiceFileError:
      'Przy zapisie faktury do pliku PDF napotkano problem! 😢',

    methodOfPaymentTransfer: 'Przelew',
    methodOfPaymentCash: 'Gotówka',

    invoiceDateOfIssue: 'Data wystawienia',
    paymentTime: 'Czas zapłaty (dni)',
    methodOfPayment: 'Sposób płatności',
    jobDuration: 'Czas pracy (dni)',
    invoiceName: 'Faktura VAT nr',

    sendEmailPopupButton: 'Wyślij e-mail',
    saveInvoiceButton: 'Zapisz fakturę',

    archivePageButton: 'Archiwum',
    mainPageButton: 'Strona główna',

    errorPageText: 'Coś poszło nie tak! 😢',
    errorPageNagivateButton: 'Powrót do Strony Głównej',

    sendingEmailPopup: {
      title: 'Potwierdzenie przesłania faktury',
      warningText: 'Akcja ta nie może zostać cofnięta!',
      confirmText:
        'Czy jesteś pewien, że chcesz przesłać fakturę pod adres e-mail',
      successText: (invoiceName: string, email: string): string => {
        return `Faktura ${invoiceName} została przesłana pod adres e-mail ${email} 📧`
      },
      errorText: (invoiceName: string, email: string): string => {
        return `Podczas przesyłania faktury ${invoiceName} pod adres e-mail ${email} wystąpił błąd! 😢`
      },
    },

    previewSelector: {
      invoiceSelectorButton: 'Podgląd faktury',
      protocolSelectorButton: 'Podgląd protokołu robót',
    },

    profitsChart: {
      sumSeriesName: 'Suma zysków',
      avgSeriesName: 'Średnia miesięczna',
      valueAxisTitle: 'Dochód - NETTO, zł',
      apiErrorNotify: 'Nie udało się pobrać danych wykresu!',
    },
  }

  export const DefaultCurrency: string = 'PLN'
  export const VatAsPercents: number = 23
  export const VAT: number = 23
  export const CurrencyFormat: FormatObject = { type: 'currency', precision: 2 }
}
