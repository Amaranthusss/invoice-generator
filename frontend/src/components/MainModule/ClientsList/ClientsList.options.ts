import { IDataGridColumn } from '../../_devExtreme/DataGrid/DataGrid.interface'

import { Enums } from '../../../constants/enums'

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'key',
    dataType: 'string',
    visible: false,
    showInColumnChooser: false,
    allowEditing: false,
  },
  {
    dataField: 'id',
    dataType: 'number',
    allowEditing: false,
    visible: false,
  },
  {
    dataField: 'name',
    dataType: 'string',
    caption: Enums.ClientsListWords.name,
  },
  {
    dataField: 'address',
    dataType: 'string',
    caption: Enums.ClientsListWords.address,
  },
  {
    dataField: 'city',
    dataType: 'string',
    caption: Enums.ClientsListWords.city,
  },
  {
    dataField: 'nip',
    dataType: 'number',
    caption: Enums.ClientsListWords.nip,
    alignment: 'left',
  },
  {
    dataField: 'email',
    dataType: 'string',
    caption: Enums.ClientsListWords.email,
  },
  {
    dataField: 'orderingData',
    dataType: 'string',
    caption: Enums.ClientsListWords.orderingData,
  },
]

export const clientListTableName: string = 'data-grid-clients'
