import dxDataGrid, {
  DataChange,
  RowInsertedInfo,
  RowRemovedInfo,
  RowUpdatedEvent,
} from 'devextreme/ui/data_grid'
import { EventInfo } from 'devextreme/events'
import { Dispatch } from 'redux'
import { useRef } from 'react'

import DataGrid from '../../_devExtreme/DataGrid/DataGrid'

import { dataSource, getColumns } from './ServicesList.options'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { updateService } from '../../../Redux-store/global.reducer'

import { IDataGridOptions } from '../../_devExtreme/DataGrid/DataGrid.interface'

const Services = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onRowUpdated = (
    e: EventInfo<dxDataGrid<any, any>> & RowUpdatedEvent<any, any>
  ) => {
    const customSavedEvent: DataChange = {
      type: 'update',
      data: e.data,
      key: e.key,
    }

    dispatch(updateService(customSavedEvent))
  }

  const onRowInserted = (
    e: EventInfo<dxDataGrid<any, any>> & RowInsertedInfo<any, any>
  ) => {
    const customSavedEvent: DataChange = {
      type: 'update',
      data: e.data,
      key: e.key,
    }

    dispatch(updateService(customSavedEvent))
  }

  const onRowRemoved = (
    e: EventInfo<dxDataGrid<any, any>> & RowRemovedInfo<any, any>
  ) => {
    const customRowRemovedEvent: DataChange = {
      type: 'remove',
      data: e.data,
      key: e.key,
    }

    dispatch(updateService(customRowRemovedEvent))
  }

  const gridOptions = useRef<IDataGridOptions>({
    name: 'data-grid-services',
    dataSource: dataSource,
    columns: getColumns(),
    selection: {
      mode: 'none',
    },
    toolbar: {
      items: [{ name: 'addRowButton', showText: 'always' }],
    },
    editing: {
      form: {
        items: [
          { dataField: 'name', isRequired: true, editorType: 'dxTextBox' },
          { dataField: 'netto', isRequired: true, editorType: 'dxTextBox' },
        ],
      },
    },
    onRowRemoved,
    onRowInserted,
    onRowUpdated,
  })

  return <DataGrid options={gridOptions.current} />
}

export default Services
