import {
  IDataGridColumn,
  IDataGridOptions,
  IDataGridToolbarItem,
} from '../common/grid/Grid.interface'

import { getPdfOptions } from './functions/getPdfOptions'

const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'lp',
    dataType: 'number',
    caption: 'LP',
    allowEditing: false,
  },
  {
    dataField: 'nazwa',
    dataType: 'string',
  },
  {
    dataField: 'vatPercent',
    dataType: 'number',
    caption: 'VAT [%]',
    allowEditing: false,
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
    allowEditing: false,
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    caption: 'Wartosc BRUTTO [zl]',
    allowEditing: false,
  },
]

const getItems = (): IDataGridToolbarItem[] => []

const dataSource = [
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

export const gridOptions: IDataGridOptions = {
  dataSource: dataSource,
  columns: getColumns(),
  toolbar: {
    customElements: getItems(),
    buttons: { exportToPdf: { enabled: true, options: getPdfOptions } },
  },
}
