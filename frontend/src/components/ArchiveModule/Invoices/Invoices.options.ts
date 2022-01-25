import { IDataGridColumn } from '../../_devExtreme/DataGrid/DataGrid.interface'

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'fileName',
    dataType: 'string',
  },
  {
    dataField: 'name',
    dataType: 'string',
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    format: 'currency',
  },
  {
    dataField: 'netto',
    format: 'currency',
    dataType: 'number',
  },
  {
    dataField: 'vatAsPercents',
    dataType: 'number',
    format: 'percent',
  },
  {
    dataField: 'vat',
    dataType: 'number',
    format: 'currency',
  },
  {
    dataField: 'fileCreationDate',
    dataType: 'datetime',
    format: 'shortDate',
  },
  {
    dataField: 'year',
    dataType: 'string',
    groupIndex: 0,
  },
  {
    dataField: 'month',
    dataType: 'string',
    groupIndex: 1,
  },
]

export const invoicesListTableName: string = 'data-grid-invoices'
