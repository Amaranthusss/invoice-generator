import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import DataGrid, { Editing, StateStoring } from 'devextreme-react/data-grid'
import dxDataGrid, { dxDataGridOptions } from 'devextreme/ui/data_grid'
import { InitializedEventInfo } from 'devextreme/events'
import { useEffect, useRef } from 'react'
import _ from 'lodash'

import dxService from '../devExtreme.service'

import { IDataGridOptions } from './DataGrid.interface'
import { IOptions } from '../../components.interface'

import { Enums } from '../../../constants/enums'

import resizeDetector from '../resizeDetector.module.css'

const DataGridPattern = (props: IOptions<IDataGridOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()
  const gridComponent = useRef<dxDataGrid>()

  const onInitialized = (
    e: InitializedEventInfo<dxDataGrid<any, any>>
  ): void => {
    gridComponent.current = e.component
    dxService.callFromProps(props, 'onInitialized', e)
  }

  const JSXElements: JSX.Element[] = [
    <StateStoring
      key={'stateStoring'}
      enabled={true}
      storageKey={props.options.name}
    />,
  ]

  useEffect(() => {
    if (props.options.editing != null) {
      JSXElements.push(
        <Editing
          key={'editing'}
          mode={'form'}
          useIcons={true}
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          newRowPosition={'last'}
          form={props.options.editing?.form}
          texts={{
            addRow: Enums.InterfaceTexts.addRowButton,
            editRow: Enums.InterfaceTexts.editRowButton,
            deleteRow: Enums.InterfaceTexts.deleteRowButton,
            confirmDeleteMessage: Enums.InterfaceTexts.confirmDeleteMessage,
          }}
        />
      )
    }
  }, [])

  const jsxElementsKeys: string[] = _.map(JSXElements, (jsx: JSX.Element) => {
    return _.toString(jsx.key)
  })

  const getOptionsExceptParams = (): dxDataGridOptions => {
    return _.omit(props.options, jsxElementsKeys)
  }

  return (
    <div className={resizeDetector.box} ref={ref}>
      <DataGrid
        {...getOptionsExceptParams()}
        width={width}
        height={height}
        showBorders={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        scrolling={{ showScrollbar: 'always' }}
        onInitialized={onInitialized}
      >
        {_.map(JSXElements)}
      </DataGrid>
    </div>
  )
}

export default DataGridPattern
