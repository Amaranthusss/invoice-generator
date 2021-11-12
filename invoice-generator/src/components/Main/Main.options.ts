import DataSource from 'devextreme/data/data_source'
import {
  IDataGridColumn,
  IDataGridOptions,
  IDataGridToolbarItem,
} from '../common/grid/Grid.interface'
import { IMainTableData } from './Main.interface'

import { getPdfOptions } from './functions/convertToPdf'

const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'lp',
    dataType: 'number',
    caption: 'LP',
  },
  {
    dataField: 'nazwa',
    dataType: 'string',
  },
  {
    dataField: 'vatPercent',
    dataType: 'number',
    caption: 'VAT [%]',
  },
  {
    dataField: 'netto',
    dataType: 'number',
    caption: 'Wartosc NETTO [zl]',
  },
  {
    dataField: 'vat',
    dataType: 'number',
    caption: 'Kwota VAT [zl]',
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    caption: 'Wartosc BRUTTO [zl]',
  },
]

const getItems = (): IDataGridToolbarItem[] => [
  { widget: 'dxButton', options: { icon: 'clear' } },
  { location: 'after', widget: 'dxButton', options: { icon: 'plus' } },
]

const dataSource: DataSource = new DataSource({
  key: 'lp',
  load: () => {
    const mainTableData: IMainTableData[] = [
      {
        lp: 1,
        nazwa:
          'Modernizacja oswietlenia w księgarni Bookszpan – Poznan, Galeria Avenida',
        brutto: 3864.66,
        netto: 3142,
        vatPercent: 23,
        vat: 722.66,
      },
    ]
    return mainTableData
  },
})

export const gridOptions: IDataGridOptions = {
  dataSource: dataSource,
  columns: getColumns(),
  toolbar: {
    customElements: getItems(),
    buttons: { exportToPdf: { enabled: true, options: getPdfOptions } },
  },
}
