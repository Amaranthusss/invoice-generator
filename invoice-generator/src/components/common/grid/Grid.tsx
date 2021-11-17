import DataGrid, { Toolbar, Item, Editing } from 'devextreme-react/data-grid'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { useResizeDetector } from 'react-resize-detector'
import { Dispatch } from 'redux'
import { useRef } from 'react'
import dxDataGrid from 'devextreme/ui/data_grid'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import _ from 'lodash'

import { useAppDispatch } from '../../../hooks/useAppDispatch'

import {
  IDataGridOptions,
  IDataGridToolbarButton,
  IDataGridToolbarItem,
} from './Grid.interface'
import { Options } from '../common.interface'
import { setPdfDoc } from '../../../store/global.slice'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const Grid = (props: Options<IDataGridOptions>): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()
  const gridComponent = useRef<dxDataGrid>()
  const dataSourceArray = useRef<any[]>()
  const { width, height, ref } = useResizeDetector()

  const documentDefinitions = useRef<TDocumentDefinitions>(
    props.options.toolbar.buttons?.exportToPdf?.options(dataSourceArray.current)
  )

  const exportGrid = () => {
    if (_.isFunction(props.options.toolbar.buttons?.exportToPdf?.options)) {
      const d = new Date()
      const date = `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`

      pdfMake
        .createPdf(documentDefinitions.current)
        .download(`Employee_list_${date}.pdf`)
    }
  }

  const updatePdfDoc = (): void => {
    pdfMake.createPdf(documentDefinitions.current).getDataUrl((outDoc) => {
      dispatch(setPdfDoc(outDoc))
    })
  }

  const onInitialized = async (e: any): Promise<void> => {
    gridComponent.current = e.component
    updatePdfDoc()

    if (_.isFunction(props.options.onInitialized)) {
      props.options.onInitialized(e)
    }

    dataSourceArray.current = await e.component.getDataSource().store().load()
  }

  const getCustomItems = (): JSX.Element[] => {
    return _.map(
      props.options.toolbar.customElements,
      (itemOptions: IDataGridToolbarItem, index: number): JSX.Element => {
        return <Item key={index} {...itemOptions} />
      }
    )
  }

  const getItems = (): JSX.Element[] => {
    return _.map(
      props.options.toolbar.buttons,
      (button: any, buttonName: string): JSX.Element => {
        switch (buttonName) {
          case 'exportToPdf':
            const buttonData: IDataGridToolbarButton = button

            return (
              <Item
                key={buttonName}
                visible={buttonData.enabled}
                widget={'dxButton'}
                options={{
                  icon: 'exportpdf',
                  onClick: exportGrid,
                }}
              />
            )
        }
        return <></>
      }
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '5vw',
        top: '5vh',
        height: '90vh',
        width: '90vw',
      }}
      ref={ref}
    >
      <DataGrid
        dataSource={props.options.dataSource}
        columns={props.options.columns}
        onInitialized={onInitialized}
        showBorders={true}
        width={width ?? '100%'}
        height={height ?? '100%'}
      >
        <Toolbar>
          {getCustomItems()}
          {getItems()}
          <Item name={'addRowButton'} showText={'always'} />
        </Toolbar>
        <Editing
          mode={'form'}
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
          confirmDelete={false}
          newRowPosition={'last'}
        />
      </DataGrid>
    </div>
  )
}

export default Grid
