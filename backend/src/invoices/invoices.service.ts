import { Injectable } from '@nestjs/common'
import * as fsPromises from 'fs/promises'
import * as _ from 'lodash'

import { getTextFromPDF } from 'src/utils/getTextFromPDF'

import { CreateFileDto } from './dtos/createFile.dtos'

import { IInvoicesList } from './invoices.interface'

const invoicesFolderPath: string = '../invoices'

const findBrutto = (pdfTexts: string[]): number => {
  return _.toNumber(
    _.replace(
      _.replace(
        _.last(
          _.filter(pdfTexts, (textPool: string) => _.includes(textPool, 'zł')),
        ),
        /zł| /g,
        '',
      ),
      /,/g,
      '.',
    ),
  )
}

const findTitle = (pdfTexts: string[]): string => {
  let title = _.last(
    _.filter(pdfTexts, (textPool: string, index: number) =>
      _.includes(textPool, 'nr'),
    ),
  )
  const nrIndex: number = _.indexOf(pdfTexts, title)
  title =
    _.size(_.replace(title, / /g, '')) === 2
      ? pdfTexts[nrIndex - 1] + title + pdfTexts[nrIndex + 1]
      : title
  title = _.replace(title, /Faktura|VAT|nr | /g, '')
  return title
}

const convertBruttoToNetto = (
  brutto: number,
  vatAsPercents: number,
): number => {
  return _.round((brutto / 100 + vatAsPercents) * 100, 2)
}

@Injectable()
export class InvoicesService {
  async findAll(): Promise<IInvoicesList> {
		console.log('findAll')
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
        const fileNames: string[] = await fsPromises.readdir(
          `${invoicesFolderPath}/${year}/${month}`,
        )
        console.log('halo?', fileNames)

        if (!_.isEmpty(fileNames)) {
          _.forEach(fileNames, (name: string, index: number) => {
            getTextFromPDF(
              `${invoicesFolderPath}/${year}/${month}/${invoicesList[year][month][index]}`,
            ).then((pdfTexts: string[]) => {
              const brutto: number = findBrutto(pdfTexts)
              const title: string = findTitle(pdfTexts)
              const vatAsPercents: number = 23
              const netto: number = convertBruttoToNetto(brutto, vatAsPercents)
              const vat: number = _.round(brutto - netto, 2)
              console.log('halo?')
              invoicesList[year][month][index] = {
                name: title,
                vat,
                vatAsPercents,
                brutto,
                netto,
                key: '',
              }

              console.log(invoicesList, 'halo')
            })
          })
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
