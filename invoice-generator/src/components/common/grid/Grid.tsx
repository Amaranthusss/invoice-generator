import { useRef } from 'react'
import dxDataGrid from 'devextreme/ui/data_grid'
import DataGrid, {
  ColumnChooser,
  Toolbar,
  Item,
} from 'devextreme-react/data-grid'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import _ from 'lodash'

import {
  IDataGridOptions,
  IDataGridToolbarButton,
  IDataGridToolbarItem,
} from './Grid.interface'
import { Options } from '../common.interface'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const Grid = (props: Options<IDataGridOptions>): JSX.Element => {
  const gridComponent = useRef<dxDataGrid>()
  const dataSourceArray = useRef<any[]>()

  const exportGrid = () => {
    if (_.isFunction(props.options.toolbar.buttons?.exportToPdf?.options)) {
      const options = props.options.toolbar.buttons?.exportToPdf?.options(
        dataSourceArray.current
      )
      const d = new Date()
      const date = `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`

      pdfMake.createPdf(options).download(`Employee_list_${date}.pdf`)
    }
  }

  const onInitialized = async (e: any): Promise<void> => {
    gridComponent.current = e.component

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
    <DataGrid
      dataSource={props.options.dataSource}
      columns={props.options.columns}
      onInitialized={onInitialized}
      showBorders={true}
    >
      <ColumnChooser enabled={true} />
      <Toolbar>
        {getCustomItems()}
        {getItems()}
      </Toolbar>
    </DataGrid>
  )
}

export default Grid
