import {
  ContentText,
  TableCell,
  TDocumentDefinitions,
  ContentTable,
} from 'pdfmake/interfaces'
import { formatDate, formatNumber } from 'devextreme/localization'
import _ from 'lodash'

import currencyAsWords from './currencyAsWords'

import {
  IServices,
  IFirmDataParameter,
  IFirmData,
} from '../Redux-store/global.reducer.interface'
import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'

import { Enums } from '../constants/enums'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
;(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs

export const updateInvoicePdfBody = (
  services: IServices | null,
  clientFirm: IClientsListClientFirmData | null,
  configurator: IConfigurator | null,
  ownFirmData: IFirmData | null
): TDocumentDefinitions => {
  if (configurator == null) {
    return {} as TDocumentDefinitions
  }

  let summaryPriceNetto: number = 0
  let summaryPriceVat: number = 0
  let summaryPriceBrutto: number = 0
  let highestVatPercent: number = 0
  let lastServiceNumber: number = 0

  const dateOfIssue: Date = new Date(configurator.dateOfIssue)
  const paymentDate: Date = dateOfIssue
  paymentDate.setDate(dateOfIssue.getDate() + configurator.paymentTime)

  const tableRecords = _.map(services, (service: IServicesListServiceData) => {
    summaryPriceNetto += service.netto
    summaryPriceVat += service.vat
    summaryPriceBrutto += service.brutto
    lastServiceNumber += 1

    if (highestVatPercent < service.vatAsPercents) {
      highestVatPercent = service.vatAsPercents
    }

    const records: TableCell[] = [
      lastServiceNumber,
      { text: service.name, alignment: 'left' },
      formatNumber(service.vatAsPercents / 100, 'percent'),
      formatNumber(service.netto, Enums.CurrencyFormat),
      formatNumber(service.vat, Enums.CurrencyFormat),
      formatNumber(service.brutto, Enums.CurrencyFormat),
    ]

    return records
  })

  const totalValues: TableCell[] = [
    [
      'Razem:',
      formatNumber(summaryPriceNetto, Enums.CurrencyFormat),
      formatNumber(summaryPriceVat, Enums.CurrencyFormat),
      formatNumber(summaryPriceBrutto, Enums.CurrencyFormat),
    ],
    [
      `${formatNumber(highestVatPercent / 100, 'percent')}`,
      formatNumber(summaryPriceNetto, Enums.CurrencyFormat),
      formatNumber(summaryPriceVat, Enums.CurrencyFormat),
      formatNumber(summaryPriceBrutto, Enums.CurrencyFormat),
    ],
  ]

  const ownFirmDataDisplay: string[] = _.map(
    ownFirmData,
    (parameter: IFirmDataParameter): string => {
      const caption = parameter.caption != null ? `${parameter.caption} ` : ''
      return caption + parameter.value + '\n'
    }
  )

  const buyerFirmDataDisplay: string[] = [
    (clientFirm?.name ?? '') + '\n',
    (clientFirm?.address ?? '') + '\n',
    (clientFirm?.city ?? '') + '\n',
    `NIP: ${clientFirm?.nip ?? ''}`,
  ]

  const getSellerFirmData = (): string[] => {
    const sellerFirmData: string[] = []
    sellerFirmData.push((ownFirmData?.name.value as string) + '\n')
    sellerFirmData.push((ownFirmData?.subname.value as string) + '\n')
    sellerFirmData.push((ownFirmData?.address.value as string) + '\n')
    sellerFirmData.push((ownFirmData?.city.value as string) + '\n')
    sellerFirmData.push(
      (ownFirmData?.nip.caption as string) + ` ${ownFirmData?.nip.value}`
    )

    return sellerFirmData
  }
  const sellerFirmData: string[] = getSellerFirmData()

  const invoiceInfoDisplay: string[] = [
    `Data wystawiena: ${formatDate(
      new Date(configurator.dateOfIssue),
      Enums.DateFormats.ShortDate
    )}`,
    `Sposób płatności: ${configurator.methodOfPayment}`,
    `Termin płatności: ${formatDate(
      paymentDate,
      Enums.DateFormats.ShortDate
    )} (${configurator.paymentTime} dni)`,
  ]

  const summaryDisplay: ContentText[] = [
    {
      text: `Razem do zapłaty: ${formatNumber(
        summaryPriceBrutto,
        Enums.CurrencyFormat
      )}\n`,
      bold: true,
      fontSize: 12,
    },
    {
      text: `Słownie: ${currencyAsWords(summaryPriceBrutto)}\n`,
      italics: true,
    },
    {
      text: `Pozostało do zapłaty: ${formatNumber(
        summaryPriceBrutto,
        Enums.CurrencyFormat
      )}\n`,
      italics: true,
    },
  ]

  return {
    info: {
      title: `Faktura VAT nr ${configurator.invoiceName}`,
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [
      {
        fontSize: 10,
        columns: [
          {
            width: '50%',
            text: ownFirmDataDisplay,
          },
          {
            width: '10%',
            text: '',
          },
          {
            alignment: 'right',
            width: '40%',
            text: _.map(invoiceInfoDisplay, (line: string) => line + '\n'),
          },
        ],
      },
      {
        margin: [0, 20, 0, 0],
        alignment: 'center',
        fontSize: 10,
        table: {
          widths: ['45%', '10%', '45%'],
          body: [
            [
              {
                border: [false, true, false, false],
                text: 'Sprzedawca:',
              },
              {
                border: [false, false, false, false],
                text: ' ',
              },
              {
                border: [false, true, false, false],
                text: 'Nabywca:',
              },
            ],
          ],
        },
      },
      {
        fontSize: 10,
        columns: [
          {
            width: '50%',
            text: sellerFirmData,
          },
          {
            width: '5.5%',
            text: '',
          },
          {
            width: '44.5%',
            text: buyerFirmDataDisplay,
          },
        ],
      },
      {
        margin: [0, 50, 0, 0],
        text: `Faktura VAT nr ${configurator.invoiceName}`,
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      {
        margin: [0, 20, 0, 0],
        fontSize: 10,
        alignment: 'center',
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              'LP',
              'Nazwa',
              'VAT',
              'Wartość NETTO',
              'Kwota VAT',
              'Wartość BRUTTO',
            ],
            ...tableRecords,
          ],
        },
        layout: {
          fillColor: function (rowIndex: number) {
            return rowIndex === 0 ? 'whitesmoke' : null
          },
        },
      },
      {
        margin: [0, 20, 0, 0],
        fontSize: 10,
        columns: [
          {
						width: '45%',
            margin: [0, 18.5, 5, 0],
            alignment: 'right',
						layout: 'noBorders',
            table: {
              widths: ['*'],
              body: [['Zestawienie VAT: '], ['W tym: ']],
            },
          },
          {
						width: '55%',
            alignment: 'center',
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Stawka', 'Wartość NETTO', 'Kwota VAT', 'Wartość BRUTTO'],
                ...(totalValues as any),
              ],
            },
            layout: {
              fillColor: (rowIndex: number, x, y) => {
                console.log(x, y)
                return rowIndex === 0 ? 'whitesmoke' : null
              },
            },
          },
        ],
      },

      {
        margin: [0, 50, 0, 0],
        fontSize: 10,
        columns: [
          {
            width: '60%',
            text: ' ',
          },
          {
            width: '40%',
            text: _.map(summaryDisplay, (line: ContentText) => line),
          },
        ],
      },
      {
        absolutePosition: { x: 40, y: 675 },
        alignment: 'center',
        table: {
          widths: ['40%', '20%', '40%'],
          body: [
            [
              {
                border: [true, true, true, true],
                stack: [
                  { text: 'Wystawił:\n', bold: true },
                  { text: 'Tadeusz Szkurłat' },
                  { text: ' ' },
                  { text: ' ' },
                  { text: ' ' },
                  { text: ' ' },
                  { text: ' ' },
                ],
              },
              {
                border: [false, false, false, false],
                text: ' ',
              },
              {
                border: [true, true, true, true],
                stack: [{ text: 'Odebrał(a):', bold: true }],
              },
            ],
          ],
        },
      },
      {
        absolutePosition: { x: 40, y: 785 },
        alignment: 'center',
        fontSize: 8,
        italics: true,
        columns: [
          {
            text: 'Podpis osoby upoważnionej do wystawienia faktury VAT',
            width: '40%',
          },
          {
            text: ' ',
            width: '20%',
          },
          {
            text: 'Podpis osoby upoważnionej do odbioru faktury VAT',
            width: '40%',
          },
        ],
      },
    ],
  }
}
