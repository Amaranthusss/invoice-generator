import {
  IDataGridColumn,
  IDataGridOptions,
} from '../../common/grid/Grid.interface'
import { IClientsListClientFirmData } from './ClientsList.interface'

import { Enums } from '../../../constants/enums'

const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'id',
    dataType: 'number',
    visible: false,
  },
  {
    dataField: 'clientId',
    dataType: 'number',
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
]

const dataSource: IClientsListClientFirmData[] = [
  {
    id: 0,
    clientId: 10000,
    name: 'Montex Sp. z o.o.',
    address: 'ul. Gen. Z.W. Jankego 249',
    city: '40-684 Katowice',
    nip: 9542471195,
  },
  {
    id: 1,
    clientId: 10001,
    name: 'Libero sp. z o. o. s. k.',
    address: 'ul. Lotników Alianckich 15',
    city: '68-100 Żagań',
    nip: 8992820376,
  },
]

export const gridOptions: IDataGridOptions = {
  dataSource: dataSource,
  columns: getColumns(),
}
