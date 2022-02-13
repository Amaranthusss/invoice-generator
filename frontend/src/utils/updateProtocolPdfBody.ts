import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { formatDate } from 'devextreme/localization'
import moment from 'moment'
import _ from 'lodash'

import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'
import { IServices } from '../Redux-store/global.reducer.interface'

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

  const dateOfIssue: Date = new Date(configurator.dateOfIssue)
  const startDate: Date = moment(dateOfIssue)
    .subtract(configurator.jobDuration ?? 0, 'd')
    .toDate()

  const getServicesNames = () => {
    if (services != null) {
      const docElements = _.map(
        services,
        (service: IServicesListServiceData) => {
          return {
            lineHeight: 1.4,
            text: `${service.name}\n`,
          }
        }
      )
      docElements[_.size(docElements) - 1] = {
        ...(_.last(docElements) as any),
        lineHeight: 2,
      }

      return docElements
    }
    return []
  }

  const getOrderingData = (): string[] => {
    const docElements: string[] = _.split(clientFirm?.orderingData, ',')
    const initDocElements: string[] = _.cloneDeep(docElements)

    if (_.size(docElements) < 3) {
      for (let i: number = 0; i < 3 - _.size(initDocElements); i++) {
        docElements.push(' ')
      }
    }

    return docElements
  }

  return {
    info: {
      title: `Protokół robót ${configurator.invoiceName}`,
    },
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [
      {
        text: 'PROTOKÓŁ TECHNICZNEGO ODBIORU ROBÓT',
        bold: true,
        style: 'header',
        alignment: 'center',
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 10,
            y1: 2,
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
        text: `Spisany w dniu ${formatDate(dateOfIssue, 'shortDate')}`,
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
              `Zamawiający: ${clientFirm?.name ?? ''}`,
              '\n',
              `${
                clientFirm?.address != null ? `${clientFirm?.address}, ` : ''
              } ${clientFirm?.city ?? ''}`,
              '\n',
              {
                lineHeight: 2,
                text: `nr zamówienia: ${formatDate(startDate, 'shortDate')}`,
              },
            ],
          },

          {
            lineHeight: 1.4,
            text: [
              'Opis zamówienia i wykonanych robót:\n',
              ...getServicesNames(),
            ],
          },

          {
            text: 'Wykonawca: Usługi Elektryczno-Budowlane „TAGRA” Taduesz Szkurłat',
          },

          {
            text: `Roboty rozpoczęto dnia ${formatDate(
              startDate,
              'shortDate'
            )}, zakończono dnia ${formatDate(dateOfIssue, 'shortDate')}`,
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
                      ol: getOrderingData(),
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
                      ol: getOrderingData(),
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
