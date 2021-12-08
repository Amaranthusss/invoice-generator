import { DataChange } from 'devextreme/ui/data_grid'
import { Dispatch } from 'redux'
import { useRef } from 'react'

import Grid from '../../common/grid/Grid'

import { dataSource, getColumns } from './ServicesList.options'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { updateService } from '../../../store/global.slice'

import { IDataGridOptions } from '../../common/grid/Grid.interface'

const Services = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onSaved = (e: any) => {
    const customSavedEvent: DataChange = {
      type: 'update',
      data: e.changes[0]?.data,
      key: e.changes[0]?.key,
    }

    dispatch(updateService(customSavedEvent))
  }

  const onRowRemoved = (e: any) => {
    const customRowRemovedEvent: DataChange = {
      type: 'remove',
      data: e.data,
      key: e.key,
    }

		dispatch(updateService(customRowRemovedEvent))
  }

  const gridOptions = useRef<IDataGridOptions>({
    dataSource: dataSource,
    columns: getColumns(),
    selection: {
      mode: 'none',
    },
    onSaved: onSaved,
    onRowRemoved: onRowRemoved,
    editing: {
      form: {
        items: [
          { dataField: 'name', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'netto', isRequired: true, editorType: 'dxTextBox' },
        ],
      },
    },
  })

  return <Grid options={gridOptions.current} />
}

export default Services
