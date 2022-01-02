import { Dispatch } from 'redux'
import _ from 'lodash'

import DataGrid from '../../devExtreme/DataGrid/DataGrid'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setClientFirm } from '../../../Redux-store/global.reducer'
import createClient from '../../../api/createClient'
import getClients from '../../../api/getClients'

import {
  IDataGridEventOnSelectionChanged,
  IDataGridEventOnInitialized,
  IDataGridOptions,
} from '../../devExtreme/DataGrid/DataGrid.interface'
import { IClientsListClientFirmData } from './ClientsList.interface'

import { dataSource, getColumns } from './ClientsList.options'

const ClientsList = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onInitialized = (e: IDataGridEventOnInitialized): void => {
    setTimeout(() => {
      e.component?.selectRowsByIndexes([0])
      e.component?.option({
        focusedRowKey: e.component.getSelectedRowKeys()[0],
      })
      createClient({
        name: 'Super Firma',
        address: '',
        city: '',
        clientId: 0,
        nip: 660,
      }).then((res) => {
        console.log('create res', res)
        getClients().then((clients) => {
          console.log('API DZIALA <3', clients)
        })
      })
    }, 100)
  }

  const onSelectionChanged = (e: IDataGridEventOnSelectionChanged): void => {
    if (!_.isEmpty(e?.selectedRowKeys)) {
      dispatch(
        setClientFirm(_.last(e.selectedRowsData) as IClientsListClientFirmData)
      )
    }
  }

  const gridOptions: IDataGridOptions = {
    name: 'data-grid-clients',
    dataSource: dataSource,
    columns: getColumns(),
    keyExpr: 'clientId',
    selection: {
      mode: 'single',
    },
    columnAutoWidth: true,
    focusedRowEnabled: true,
    onInitialized,
    onSelectionChanged,
  }

  return <DataGrid options={gridOptions} />
}

export default ClientsList
