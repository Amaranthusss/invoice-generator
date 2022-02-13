import {
  ContentText,
  TableCell,
  TDocumentDefinitions,
} from 'pdfmake/interfaces'
import { formatDate, formatNumber } from 'devextreme/localization'
import _ from 'lodash'

import currencyAsWords from './currencyAsWords'

import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServices } from '../Redux-store/global.reducer.interface'

import { Enums } from '../constants/enums'
import { firmData as ownFirmData, IFirmDataParameter } from '../data/firmData'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'

import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
;(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs

export const updateProtocolPdfBody = (
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
      title: `Protokół robót ${configurator.invoiceName}`,
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [
      {
        text: 'PROTOKÓŁ TECHNICZNEGO ODBIORU ROBÓT',
        style: 'header',
        alignment: 'center',
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 10,
            y1: 0,
            x2: 490,
            y2: 0,
            lineWidth: 0.5,
          },
        ],
      },
      {
        text: ' ',
      },
      {
        text: 'Spisany w dniu 20.01.2022',
        alignment: 'center',
      },
      {
        text: ' ',
      },
      {
				alignment: 'justify',
        lineHeight: 2,
        ol: [
          {
            lineHeight: 1.4,
            text: [
              'Zamawiający: PPUH Montex Henryk Bywalec',
              '\n',
              'ul. Bazyliowa 10B, 40-750 Katowice',
              '\n',
              {
                lineHeight: 2,
                text: 'nr zamówienia: 06.01.4022',
              },
            ],
          },

          {
            lineHeight: 1.4,
            text: [
              'Opis zamówienia i wykonanych robót:',
              '\n',
              {
                lineHeight: 2,
                text: 'Prace związane z przebudową lokalu Media Markt w Opolu',
              },
            ],
          },

          {
            text: 'Wykonawca: Usługi Elektryczno-Budowlane „TAGRA” Taduesz Szkurłat',
          },

          {
            text: 'Roboty rozpoczęto dnia 06.01.4022 zakończono dnia 20.01.4022',
          },

          [
            {
              lineHeight: 1.4,
              text: 'Komisja w składzie:',
            },

            {
              lineHeight: 1.4,
              columns: [
                {
                  stack: [
                    'Zamawiający:',
                    {
                      type: 'lower-alpha',
                      ol: ['Piotr Półtorak', ' ', ' '],
                    },
                  ],
                },
                {
                  stack: [
                    'Wykonawca:',
                    {
                      type: 'lower-alpha',
                      ol: ['Tadeusz Szkurłat', ' ', ' '],
                    },
                  ],
                },
              ],
            },

            {
              lineHeight: 1.4,
              text: ' ',
            },

            {
              lineHeight: 1.4,
              text: 'Komisja w składzie j.w po dokonaniu oględzin wykonanych robót stwierdza, że roboty wykonane zostały zgodnie / nie zgodnie z zamówieniem, bez usterek / z usterkami.',
            },

            {
              lineHeight: 1.4,
              text: ['- Bez usterek'],
            },

            {
              lineHeight: 1.4,
              text: ' ',
            },

            {
              text: 'Wykonawca zobowiązuje się usunąć usterki do dnia ..................................',
            },
          ],

          [
            {
              lineHeight: 1.4,
              text: 'Uwagi Zamawiającego:',
            },
            {
              lineHeight: 1.4,
              text: ['- Bez usterek'],
            },
          ],
        ],
      },

      {
        columns: [
          [
            { text: 'PODPISY KOMISJI:', alignment: 'center' },

            { text: ' ' },

            {
              lineHeight: 1.4,
              columns: [
                {
                  stack: [
                    'Zamawiający:',
                    {
                      type: 'lower-alpha',
                      ol: ['Piotr Półtorak', ' ', ' '],
                    },
                  ],
                },
                {
                  stack: [
                    'Wykonawca:',
                    {
                      type: 'lower-alpha',
                      ol: ['Tadeusz Szkurłat', ' ', ' '],
                    },
                  ],
                },
              ],
            },
          ],
        ],
        absolutePosition: { x: 60, y: 675 },
      },
    ],
  }
}
