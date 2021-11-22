import { formatDate } from 'devextreme/localization'
import { format } from 'devextreme/ui/widget/ui.widget'
import { ContentText, TDocumentDefinitions } from 'pdfmake/interfaces'
import _ from 'lodash'

import currencyAsWords from '../../../../utils/currencyAsWords'

import { IMainTableData } from '../../Main.interface'

import { Enums } from '../../../../constants/enums'
import {
  firmData as ownFirmData,
  IFirmData,
  IFirmDataParameter,
} from '../../../../data/firmData'

const invoiceNumber: string = '1/10/2021'
const dateOfIssue: Date = new Date()
const shortDateFormat: format = Enums.DateFormats.ShortDate
const methodOfPayment: string = 'Przelew'
const paymentTime: number = 14
const dateOfPayment: Date = new Date()
dateOfPayment.setDate(dateOfIssue.getDate() + paymentTime)
const buyerFirmData: IFirmData = {
  name: { value: 'Montex Sp. z o.o.' },
  address: { value: 'ul. Gen. Z.W. Jankego 249' },
  city: { value: '40-684 Katowice' },
  nip: { value: 9542471195, caption: 'NIP:' },
}

export const getPdfOptions = (
  mainTableData: IMainTableData[]
): TDocumentDefinitions => {
  let summaryPriceBrutto: number = 0
  const tableRecords: (string | number)[][] = _.map(
    mainTableData,
    (row: IMainTableData) => {
      summaryPriceBrutto += row.brutto
      return _.map(row, (value: string | number) => value)
    }
  )

  const ownFirmDataDisplay: string[] = _.map(
    ownFirmData,
    (parameter: IFirmDataParameter): string => {
      const caption = parameter.caption != null ? `${parameter.caption} ` : ''
      return caption + parameter.value + '\n'
    }
  )

  const buyerFirmDataDisplay: string[] = _.map(
    buyerFirmData,
    (parameter: IFirmDataParameter): string => {
      const caption = parameter.caption != null ? `${parameter.caption} ` : ''
      return caption + parameter.value + '\n'
    }
  )

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
    `Data wystawiena: ${formatDate(dateOfIssue, shortDateFormat)}`,
    `Sposób płatności: ${methodOfPayment}`,
    `Termin płatności: ${formatDate(
      dateOfPayment,
      shortDateFormat
    )} (${paymentTime} dni)`,
  ]

  const summaryDisplay: ContentText[] = [
    {
      text: `Razem do zapłaty: ${summaryPriceBrutto} zł\n`,
      bold: true,
      fontSize: 12,
    },
    {
      text: `Słownie: ${currencyAsWords(summaryPriceBrutto)}\n`,
      italics: true,
    },
    {
      text: `Pozostało do zapłaty: ${summaryPriceBrutto} zł\n`,
      italics: true,
    },
  ]

  return {
    info: {
      title: `TAGRA Faktura VAT nr ${invoiceNumber}`,
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
        text: `Faktura VAT nr ${invoiceNumber}`,
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
