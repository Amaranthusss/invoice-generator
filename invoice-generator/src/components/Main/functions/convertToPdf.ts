import { formatDate } from 'devextreme/localization'
import { format } from 'devextreme/ui/widget/ui.widget'
import _ from 'lodash'

import { IMainTableData } from '../Main.interface'

import { Enums } from '../../../constants/enums'
import {
  firmData as ownFirmData,
  IFirmDataParameter,
} from '../../../data/firmData'

const invoiceNumber: string = '1/10/2021'
const dateOfIssue: Date = new Date()
const shortDateFormat: format = Enums.DateFormats.ShortDate
const methodOfPayment: string = 'Przelew'
const paymentTime: number = 14
const dateOfPayment: Date = new Date()
dateOfPayment.setDate(dateOfIssue.getDate() + paymentTime)

export const getPdfOptions = (mainTableData: IMainTableData[]): any => {
  const tableRecords = _.map(mainTableData, (row: IMainTableData) => {
    return _.map(row, (value: string | number) => value)
  })

  const ownFirmDataDisplay: string[] = _.map(
    ownFirmData,
    (parameter: IFirmDataParameter) => {
      const caption = parameter.caption != null ? `${parameter.caption} ` : ''
      return caption + parameter.value + '\n'
    }
  )

  const invoiceInfoDisplay: string[] = [
    `Data wystawiena: ${formatDate(dateOfIssue, shortDateFormat)}`,
    `Sposób płatności: ${methodOfPayment}`,
    `Termin płatności: ${formatDate(
      dateOfPayment,
      shortDateFormat
    )} (${paymentTime} dni)`,
  ]

  return {
    info: {
      title: `TAGRA Faktura VAT nr ${invoiceNumber}`,
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    footer: function (currentPage: number, pageCount: number) {
      return [
        {
          text: `Employee Management Sytem - ${currentPage.toString()} of ${pageCount}`,
          alignment: 'right',
          fontSize: 10,
          color: '#aaa',
        },
      ]
    },
    content: [
      {
        fontSize: 8,
        columns: [
          {
            width: '40%',
            text: ownFirmDataDisplay,
          },
          {
            width: '20%',
            text: '',
          },
          {
            width: '40%',
            text: _.map(invoiceInfoDisplay, (line: string) => line + '\n'),
          },
        ],
      },
      {
        text: `Faktura VAT nr ${invoiceNumber}`,
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      {
        fontSize: 10,
        table: {
          headerRows: 1,
          body: [
            [
              'LP',
              'Nazwa',
              'Wartość NETTO [zł]',
              'Wartość VAT [zł]',
              'VAT [%]',
              'Wartość BRUTTO [zł]',
            ],
            ...tableRecords,
          ],
        },
      },
    ],
  }
}
