import { Injectable } from '@nestjs/common'
import * as fsPromises from 'fs/promises'
import * as _ from 'lodash'

import {
  findBrutto,
  findTitle,
  getFileCreationDate,
  getTextFromPDF,
} from 'src/utils/mathFiles'
import { convertBruttoToNetto } from 'src/utils/currencyCalculations'

import { CreateFileDto } from './dtos/createFile.dto'

import {
  IInvoicesList,
  IInvoicesListMonth,
  IServicesListServiceData,
} from './invoices.interface'
import { IGetTableData } from './dtos/getTableData.interface'

@Injectable()
export class InvoicesService {
  invoicesFolderPath: string = process.env.APP_INVOICES_FOLDER_PATH

  async findAll(): Promise<IInvoicesList> {
    const invoicesList: IInvoicesList = {}
    const years: string[] = await fsPromises.readdir(this.invoicesFolderPath)
    const monthsInYearsPromises: Promise<string[]>[] = _.map(
      years,
      (year: string): Promise<string[]> => {
        return fsPromises.readdir(`${this.invoicesFolderPath}/${year}`)
      },
    )
    const monthsInYears: string[][] = await Promise.all(monthsInYearsPromises)

    for (const [index, year] of _.entries(years)) {
      invoicesList[year] = {}
      for (const month of monthsInYears[index]) {
        const fileNames: string[] = await fsPromises.readdir(
          `${this.invoicesFolderPath}/${year}/${month}`,
        )

        if (!_.isEmpty(fileNames)) {
          invoicesList[year][month] = []

          for (const [index, fileName] of _.entries(fileNames)) {
            const path: string = `${this.invoicesFolderPath}/${year}/${month}/${fileName}`
            const vatAsPercents: number = 23
            const pdfTexts: string[] = await getTextFromPDF(path)
            const brutto: number = findBrutto(pdfTexts)
            const title: string = findTitle(pdfTexts)
            const netto: number = convertBruttoToNetto(brutto, vatAsPercents)
            const vat: number = _.round(brutto - netto, 2)

            invoicesList[year][month][index] = {
              fileCreationDate: getFileCreationDate(path),
              vatAsPercents: vatAsPercents / 100,
              name: title,
              fileName,
              brutto,
              netto,
              vat,
            }
          }
        }
      }
    }

    return invoicesList
  }

  async getTableData(): Promise<IGetTableData[]> {
    const invoicesList: IInvoicesList = await this.findAll()
    const tableData: IGetTableData[] = []

    _.forEach(invoicesList, (year: IInvoicesListMonth, yearName: string) => {
      _.forEach(
        year,
        (monthFolderName: IServicesListServiceData[], monthName: string) => {
          _.forEach(monthFolderName, (invoice: IServicesListServiceData) => {
            tableData.push({
              name: invoice.name,
              netto: invoice.netto,
              vat: invoice.vat,
              brutto: invoice.brutto,
              fileName: invoice.fileName,
              vatAsPercents: invoice.vatAsPercents,
              month: monthName,
              year: yearName,
              fileCreationDate: invoice.fileCreationDate,
            })
          })
        },
      )
    })
    console.log(tableData)

    return tableData
  }

  async createFile(fileOptions: CreateFileDto): Promise<any> {
    const allMonths: string[] = await fsPromises.readdir(
      `${this.invoicesFolderPath}/${fileOptions.year}`,
    )
    const monthFolderName: string = _.find(
      allMonths,
      (monthFolderName: string) =>
        _.includes(monthFolderName, fileOptions.month),
    )
    const filePath: string = `${this.invoicesFolderPath}/${fileOptions.year}/${monthFolderName}/${fileOptions.fileName}.pdf`

    return fsPromises.writeFile(filePath, fileOptions.base64, {
      encoding: 'base64',
    })
  }
}
