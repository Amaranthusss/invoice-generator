import _ from 'lodash'

import { IMainTableData } from '../Main.interface'

export const getPdfOptions = (mainTableData: IMainTableData[]): any => {
  console.log(mainTableData)
  const keys = [
    'lp',
    'nazwa',
    'vatPercent',
    'employmentType',
    'netto',
    'vat',
    'brutto',
  ]

  const records = _.map(mainTableData, (row: IMainTableData) => {
    return _.map(row, (value: string | number) => value)
  })

  return {
    info: {
      title: 'Faktura VAT nr ĄĆŃŚŻŹ',
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
          margin: [0, 0, 30, 10],
        },
      ]
    },
    content: [
      { text: 'Faktura VAT nr ĄĆŃŚŻŹ', margin: [0, 16], fontSize: 16, bold: true },
      { text: 'Faktura VAT nr ĄĆŃŚŻŹ', margin: [0, 16], fontSize: 16, bold: true },
      { text: 'Faktura VAT nr ĄĆŃŚŻŹ', margin: [0, 16], fontSize: 16, bold: true },
      { text: 'Faktura VAT nr ĄĆŃŚŻŹ', margin: [0, 16], fontSize: 16, bold: true },
      {
        layout: 'lightHorizontalLines',
        fontSize: 10,
        table: {
          headerRows: 1,
          body: [...records],
        },
      },
    ],
  }
}
