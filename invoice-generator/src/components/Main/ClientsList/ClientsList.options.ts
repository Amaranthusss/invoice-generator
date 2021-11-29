import { nanoid } from '@reduxjs/toolkit'

import { IClientsListClientFirmData } from './ClientsList.interface'
import { IDataGridColumn } from '../../common/grid/Grid.interface'

import { Enums } from '../../../constants/enums'

export const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'key',
    dataType: 'string',
    visible: false,
    showInColumnChooser: false,
    allowEditing: false,
    calculateCellValue: () => nanoid(),
  },
  {
    dataField: 'clientId',
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
]

export const dataSource: IClientsListClientFirmData[] = [
  {
    clientId: 10000,
    name: 'Montex Sp. z o.o.',
    address: 'ul. Gen. Z.W. Jankego 249',
    city: '40-684 Katowice',
    nip: 9542471195,
  },
  {
    clientId: 10001,
    name: 'Libero sp. z o. o. s. k.',
    address: 'ul. Lotników Alianckich 15',
    city: '68-100 Żagań',
    nip: 8992820376,
  },
]
