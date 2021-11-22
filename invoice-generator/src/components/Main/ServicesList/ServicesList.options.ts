import { Enums } from '../../../constants/enums'
import {
  IDataGridColumn,
  IDataGridOptions,
  IDataGridToolbarItem,
} from '../../common/grid/Grid.interface'

import { getPdfOptions } from './functions/getPdfOptions'
import { IServicesListServiceData } from './ServicesList.interface'

const getColumns = (): IDataGridColumn[] => [
  {
    dataField: 'id',
    dataType: 'number',
    caption: Enums.ServicesListWords.id,
    allowEditing: false,
  },
  {
    dataField: 'name',
    dataType: 'string',
    caption: Enums.ServicesListWords.name,
  },
  {
    dataField: 'vatAsPercents',
    dataType: 'number',
    caption: Enums.ServicesListWords.vatAsPercents,
    allowEditing: false,
  },
  {
    dataField: 'netto',
    dataType: 'number',
    caption: Enums.ServicesListWords.netto,
  },
  {
    dataField: 'vat',
    dataType: 'number',
    caption: Enums.ServicesListWords.vat,
    allowEditing: false,
  },
  {
    dataField: 'brutto',
    dataType: 'number',
    caption: Enums.ServicesListWords.brutto,
    allowEditing: false,
  },
]

const getItems = (): IDataGridToolbarItem[] => []

const dataSource: IServicesListServiceData[] = [
  {
    id: 1,
    name: 'Modernizacja oswietlenia w księgarni Bookszpan – Poznan, Galeria Avenida',
    brutto: 3864.66,
    netto: 3142,
    vatAsPercents: 23,
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
