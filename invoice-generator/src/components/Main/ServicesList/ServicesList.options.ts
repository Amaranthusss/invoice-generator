import { IServicesListServiceData } from './ServicesList.interface'
import { IDataGridColumn } from '../../common/grid/Grid.interface'

import { Enums, VAT } from '../../../constants/enums'

const getBrutto = (e: IServicesListServiceData): number => {
  return e.netto * (VAT / 100 + 1)
}

const getVatAsPercents = (e: IServicesListServiceData): number => {
  return VAT / 100
}

const getVat = (e: IServicesListServiceData): number => {
  return e.netto * (VAT / 100)
}

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'key',
    dataType: 'string',
    visible: true,
    showInColumnChooser: false,
    allowEditing: false,
    calculateCellValue: (rowData: IServicesListServiceData) => rowData.key,
  },
  {
    dataField: 'name',
    dataType: 'string',
    caption: Enums.ServicesListWords.name,
  },
  {
    dataField: 'vatAsPercents',
    dataType: 'number',
    caption: Enums.ServicesListWords.vatAsPercents,
    allowEditing: false,
    format: { type: 'percent' },
    calculateCellValue: getVatAsPercents,
  },
  {
    dataField: 'netto',
    dataType: 'number',
    caption: Enums.ServicesListWords.netto,
    format: { precision: 2, type: 'currency' },
  },
  {
    dataField: 'vat',
    dataType: 'number',
    caption: Enums.ServicesListWords.vat,
    allowEditing: false,
    calculateCellValue: getVat,
    format: { precision: 2, type: 'currency' },
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    caption: Enums.ServicesListWords.brutto,
    allowEditing: false,
    calculateCellValue: getBrutto,
    format: { precision: 2, type: 'currency' },
  },
]

export const dataSource: IServicesListServiceData[] = []
