import { Dispatch } from 'redux'
import _ from 'lodash'

import Grid from '../../common/grid/Grid'

import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setClientFirm } from '../../../store/global.slice'

import { IClientsListClientFirmData } from './ClientsList.interface'
import { IDataGridOptions } from '../../common/grid/Grid.interface'

import { dataSource, getColumns } from './ClientsList.options'

const ClientsList = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onSelectionChanged = (e: any): void => {
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
    onSelectionChanged: onSelectionChanged,
  }

  return <Grid options={gridOptions} />
}

export default ClientsList
