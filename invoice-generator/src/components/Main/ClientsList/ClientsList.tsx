import { Dispatch } from 'redux'
import _ from 'lodash'

import Grid from '../../common/grid/Grid'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setClientFirm } from '../../../store/global.slice'

import {
  IDataGridEventOnSelectionChanged,
  IDataGridEventOnInitialized,
  IDataGridOptions,
} from '../../common/grid/Grid.interface'
import { IClientsListClientFirmData } from './ClientsList.interface'

import { dataSource, getColumns } from './ClientsList.options'

const ClientsList = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onInitialized = (e: IDataGridEventOnInitialized) => {
    setTimeout(() => {
      e.component?.selectRowsByIndexes([0])
      e.component?.option({
        focusedRowKey: e.component.getSelectedRowKeys()[0],
      })
    }, 10)
  }

  const onSelectionChanged = (e: IDataGridEventOnSelectionChanged): void => {
    if (_.size(e?.selectedRowKeys) > 0) {
      dispatch(
        setClientFirm(_.last(e.selectedRowsData) as IClientsListClientFirmData)
      )
    }
  }

  const gridOptions: IDataGridOptions = {
    dataSource: dataSource,
    columns: getColumns(),
    keyExpr: 'clientId',
    selection: {
      mode: 'single',
    },
    columnAutoWidth: true,
    focusedRowEnabled: true,
    onInitialized: onInitialized,
    onSelectionChanged: onSelectionChanged,
  }

  return <Grid options={gridOptions} />
}

export default ClientsList
