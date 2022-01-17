import { IServicesListServiceData } from './ServicesList.interface'
import { IDataGridColumn } from '../../_devExtreme/DataGrid/DataGrid.interface'

import { Enums } from '../../../constants/enums'

const getBrutto = (e: IServicesListServiceData): number => {
  return e.netto * (Enums.VAT / 100 + 1)
}

const getVatAsPercents = (e: IServicesListServiceData): number => {
  return Enums.VAT / 100
}

const getVat = (e: IServicesListServiceData): number => {
  return e.netto * (Enums.VAT / 100)
}

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'key',
    dataType: 'string',
    visible: false,
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
    format: 'percent',
    calculateCellValue: getVatAsPercents,
    width: 'auto',
  },
  {
    dataField: 'netto',
    dataType: 'number',
    caption: Enums.ServicesListWords.netto,
    format: Enums.CurrencyFormat,
    width: 'auto',
  },
  {
    dataField: 'vat',
    dataType: 'number',
    caption: Enums.ServicesListWords.vat,
    allowEditing: false,
    calculateCellValue: getVat,
    format: Enums.CurrencyFormat,
    width: 'auto',
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    caption: Enums.ServicesListWords.brutto,
    allowEditing: false,
    calculateCellValue: getBrutto,
    format: Enums.CurrencyFormat,
    width: 'auto',
  },
]

export const dataSource: IServicesListServiceData[] = []
