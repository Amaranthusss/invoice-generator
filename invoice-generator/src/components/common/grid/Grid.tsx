import DataGrid, { Toolbar, Item, Editing } from 'devextreme-react/data-grid'
import { useResizeDetector } from 'react-resize-detector'
import { useRef } from 'react'
import dxDataGrid from 'devextreme/ui/data_grid'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import _ from 'lodash'

import { IDataGridOptions, IDataGridToolbarItem } from './Grid.interface'
import { Options } from '../common.interface'

import { Enums } from '../../../constants/enums'

import styles from './Grid.module.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const defaultKeyExpr: string = 'key'

const Grid = (props: Options<IDataGridOptions>): JSX.Element => {
  const gridComponent = useRef<dxDataGrid>()
  const dataSourceArray = useRef<any[]>()
  const { width, height, ref } = useResizeDetector()

  const onInitialized = async (e: any): Promise<void> => {
    gridComponent.current = e.component

    if (_.isFunction(props.options.onInitialized)) {
      props.options.onInitialized(e)
    }

    dataSourceArray.current = await e.component.getDataSource().store().load()

    setTimeout(() => {
      gridComponent.current?.selectRowsByIndexes([0])
      gridComponent.current?.option({
        focusedRowKey: gridComponent.current.getSelectedRowKeys()[0],
      })
    }, 100)
  }

  const onSelectionChanged = (e: any) => {
    if (_.isFunction(props.options.onSelectionChanged)) {
      props.options.onSelectionChanged(e)
    }
  }

  const getCustomItems = (): JSX.Element[] => {
    return _.map(
      props.options.toolbar?.customElements,
      (itemOptions: IDataGridToolbarItem, index: number): JSX.Element => {
        return <Item key={index} {...itemOptions} />
      }
    )
  }

  const onRowInserted = (e: any) => {
    if (_.isFunction(props.options.onRowInserted)) {
      props.options.onRowInserted(e)
    }
  }

  const onSaved = (e: any) => {
    if (_.isFunction(props.options.onSaved)) {
      props.options.onSaved(e)
    }
  }

  const onRowRemoved = (e: any) => {
    if (_.isFunction(props.options.onRowRemoved)) {
      props.options.onRowRemoved(e)
    }
  }

  return (
    <div className={styles.container} ref={ref}>
      <DataGrid
        dataSource={props.options.dataSource}
        columns={props.options.columns}
        width={width}
        height={height}
        selection={props.options.selection}
        showBorders={true}
        focusedRowEnabled={props.options.focusedRowEnabled ?? false}
        columnAutoWidth={props.options.columnAutoWidth ?? false}
        keyExpr={props.options.keyExpr ?? defaultKeyExpr}
        onInitialized={onInitialized}
        onSelectionChanged={onSelectionChanged}
        onRowInserted={onRowInserted}
        onSaved={onSaved}
        onRowRemoved={onRowRemoved}
      >
        <Toolbar>
          {getCustomItems()}
          <Item name={'addRowButton'} showText={'always'} />
        </Toolbar>
        <Editing
          mode={'form'}
          useIcons={true}
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          confirmDelete={false}
          newRowPosition={'last'}
          form={props.options.editing?.form}
          texts={{
            addRow: Enums.DataGridEditingTexts.addRow,
            editRow: Enums.DataGridEditingTexts.editRow,
            deleteRow: Enums.DataGridEditingTexts.deleteRow,
          }}
        />
      </DataGrid>
    </div>
  )
}

export default Grid
