import { ContentText, TDocumentDefinitions } from 'pdfmake/interfaces'
import { formatDate, formatNumber } from 'devextreme/localization'
import _ from 'lodash'

import currencyAsWords from './currencyAsWords'

import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServices } from '../Redux-store/global.reducer.interface'

import { Enums } from '../constants/enums'
import { firmData as ownFirmData, IFirmDataParameter } from '../data/firmData'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'

export const updatePdfBody = (
  services: IServices | null,
  clientFirm: IClientsListClientFirmData | null,
  configurator: IConfigurator | null
): TDocumentDefinitions => {
  if (configurator == null) {
    return {} as TDocumentDefinitions
  }

  let summaryPriceBrutto: number = 0
  let lastServiceNumber: number = 0

  const dateOfIssue: Date = new Date(configurator.dateOfIssue)
  const paymentDate: Date = dateOfIssue
  paymentDate.setDate(dateOfIssue.getDate() + configurator.paymentTime)

  const tableRecords = _.map(services, (service: IServicesListServiceData) => {
    summaryPriceBrutto += service.brutto
    lastServiceNumber += 1

    const records: (string | number)[] = [
      lastServiceNumber,
      service.name,
      formatNumber(service.vatAsPercents / 100, 'percent'),
      formatNumber(service.netto, Enums.CurrencyFormat),
      formatNumber(service.vat, Enums.CurrencyFormat),
      formatNumber(service.brutto, Enums.CurrencyFormat),
    ]

    return records
  })

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
    sellerFirmData.push((ownFirmData.name.value as string) + '\n')
    sellerFirmData.push((ownFirmData.subname.value as string) + '\n')
    sellerFirmData.push((ownFirmData.address.value as string) + '\n')
    sellerFirmData.push((ownFirmData.city.value as string) + '\n')
    sellerFirmData.push(
      (ownFirmData.nip.caption as string) + ` ${ownFirmData.nip.value}`
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
      title: `TAGRA Faktura VAT nr ${configurator.invoiceName}`,
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
