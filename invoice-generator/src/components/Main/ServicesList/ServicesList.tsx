import { DataChange } from 'devextreme/ui/data_grid'
import { Dispatch } from 'redux'
import { useRef } from 'react'
import _ from 'lodash'

import Grid from '../../common/grid/Grid'

import { dataSource, getColumns } from './ServicesList.options'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { updateService } from '../../../store/global.slice'

import { IDataGridOptions } from '../../common/grid/Grid.interface'

const Services = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()

  const onChangesChange = (e: DataChange[]) => {
    if (_.size(e) > 0) {
      dispatch(updateService(e[_.size(e) - 1] as any))
    }
  }

  const gridOptions = useRef<IDataGridOptions>({
    dataSource: dataSource,
    columns: getColumns(),
    showPdfDocAtPreview: true,
    selection: {
      mode: 'none',
    },
    onChangesChange: onChangesChange,
    editing: {
      form: {
        items: [
          { dataField: 'name', isRequired: true },
          { dataField: 'netto', isRequired: true },
        ],
      },
    },
  })

  return <Grid options={gridOptions.current} />
}

export default Services
