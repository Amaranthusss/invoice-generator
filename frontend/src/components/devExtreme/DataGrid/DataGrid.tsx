import DataGrid, {
  Toolbar,
  Item,
  Editing,
  StateStoring,
} from 'devextreme-react/data-grid'
import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import dxDataGrid, { dxDataGridOptions } from 'devextreme/ui/data_grid'
import { useRef } from 'react'
import _ from 'lodash'

import dxService from '../dxService'

import {
  IDataGridEventOnInitialized,
  IDataGridEventOnOptionChanged,
  IDataGridEventOnRowRemoved,
  IDataGridEventOnSaved,
  IDataGridEventOnSelectionChanged,
  IDataGridOptions,
  IDataGridToolbarItem,
} from './DataGrid.interface'
import { IOptions } from '../../components.interface'

import { Enums } from '../../../constants/enums'

import resizeDetector from '../resizeDetector.module.css'

const DataGridWrapper = (props: IOptions<IDataGridOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()
  const gridComponent = useRef<dxDataGrid>()

  const onInitialized = async (
    e: IDataGridEventOnInitialized
  ): Promise<void> => {
    gridComponent.current = e.component
    dxService.callFromProps(props, 'onInitialized', e)
  }

  const getCustomItems = (): JSX.Element[] => {
    return _.map(
      props.options.toolbar?.customElements,
      (itemOptions: IDataGridToolbarItem, index: number): JSX.Element => {
        return <Item key={index} {...itemOptions} />
      }
    )
  }

  const JSXElements: JSX.Element[] = [
    <Toolbar key={'toolbar'}>
      {getCustomItems()}
      <Item name={'addRowButton'} showText={'always'} />
    </Toolbar>,
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
    />,
    <StateStoring
      key={'stateStoring'}
      enabled={true}
      storageKey={props.options.name}
    />,
  ]

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
        onInitialized={onInitialized}
        onSelectionChanged={(e: IDataGridEventOnSelectionChanged) =>
          dxService.callFromProps(props, 'onSelectionChanged', e)
        }
        onSaved={(e: IDataGridEventOnSaved) =>
          dxService.callFromProps(props, 'onSaved', e)
        }
        onRowRemoved={(e: IDataGridEventOnRowRemoved) =>
          dxService.callFromProps(props, 'onRowRemoved', e)
        }
        onOptionChanged={(e: IDataGridEventOnOptionChanged) =>
          dxService.callFromProps(props, 'onOptionChanged', e)
        }
      >
        {_.map(JSXElements)}
      </DataGrid>
    </div>
  )
}

export default DataGridWrapper
