import { Injectable } from '@nestjs/common'
import * as fsPromises from 'fs/promises'
import * as _ from 'lodash'

import { getTextFromPDF } from 'src/utils/getTextFromPDF'

import { CreateFileDto } from './dtos/createFile.dtos'

import { IInvoicesList } from './invoices.interface'

const invoicesFolderPath: string = '../invoices'

@Injectable()
export class InvoicesService {
  async findAll(): Promise<IInvoicesList> {
    const invoicesList: IInvoicesList = {}
    const years: string[] = await fsPromises.readdir(invoicesFolderPath)
    const monthsInYearsPromises: Promise<string[]>[] = _.map(
      years,
      (year: string): Promise<string[]> => {
        return fsPromises.readdir(`${invoicesFolderPath}/${year}`)
      },
    )
    const monthsInYears: string[][] = await Promise.all(monthsInYearsPromises)

    for (const [index, year] of _.entries(years)) {
      invoicesList[year] = {}
      for (const month of monthsInYears[index]) {
        invoicesList[year][month] = await fsPromises.readdir(
          `${invoicesFolderPath}/${year}/${month}`,
        )
        if (!_.isEmpty(invoicesList[year][month])) {
          _.forEach(
            invoicesList[year][month],
            (name: string, index: number) => {
              getTextFromPDF(
                `${invoicesFolderPath}/${year}/${month}/${invoicesList[year][month][index]}`,
              ).then((pdfTexts: string[]) => {
                const brutto: string = _.last(
                  _.filter(pdfTexts, (textPool: string) =>
                    _.includes(textPool, 'zł'),
                  ),
                )
                let title: string = _.last(
                  _.filter(pdfTexts, (textPool: string, index: number) =>
                    _.includes(textPool, 'nr'),
                  ),
                )
                const nrIndex: number = _.indexOf(pdfTexts, title)
                title =
                  _.size(_.replace(title, / /g, '')) === 2
                    ? pdfTexts[nrIndex - 1] + title + pdfTexts[nrIndex + 1]
                    : title
                title = _.replace(title, /Faktura/g, '')
                title = _.replace(title, /VAT/g, '')
                title = _.replace(title, /nr /g, '')
                title = _.replace(title, / /g, '')
                console.log(title, brutto, month, year)
              })
            },
          )
        }
      }
    }

    return invoicesList
  }

  async createFile(fileOptions: CreateFileDto): Promise<any> {
    const allMonths: string[] = await fsPromises.readdir(
      `${invoicesFolderPath}/${fileOptions.year}`,
    )
    const monthFolderName: string = _.find(
      allMonths,
      (monthFolderName: string) =>
        _.includes(monthFolderName, fileOptions.month),
    )
    const filePath: string = `${invoicesFolderPath}/${fileOptions.year}/${monthFolderName}/${fileOptions.fileName}.pdf`

    return fsPromises.writeFile(filePath, fileOptions.base64, {
      encoding: 'base64',
    })
  }
}
