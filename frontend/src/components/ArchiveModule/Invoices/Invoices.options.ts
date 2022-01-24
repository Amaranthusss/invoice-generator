import { IDataGridColumn } from '../../_devExtreme/DataGrid/DataGrid.interface'

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'name',
    dataType: 'string',
  },
  {
    dataField: 'brutto',
    dataType: 'number',
  },
  {
    dataField: 'netto',
    dataType: 'number',
  },
  {
    dataField: 'vatAsPercents',
    dataType: 'number',
  },
  {
    dataField: 'vat',
    dataType: 'number',
  },
  {
    dataField: 'fileName',
    dataType: 'string',
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
