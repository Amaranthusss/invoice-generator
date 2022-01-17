import {
  dxDataGridColumn,
  dxDataGridOptions,
  Toolbar,
} from 'devextreme/ui/data_grid'
import CSS from 'csstype'

export interface IDataGridOptions extends dxDataGridOptions {
  name: string
}

type customToolbarItems = {
  customElements?: IDataGridToolbarItem[]
}

export interface IDataGridColumn extends dxDataGridColumn {}

export interface IDataGridToolbarItem {
  location?: 'after' | 'before' | 'center'
  options: IDataGridItemOptions
  widget?:
    | 'dxAutocomplete'
    | 'dxButton'
    | 'dxCheckBox'
    | 'dxDateBox'
    | 'dxMenu'
    | 'dxSelectBox'
    | 'dxTabs'
    | 'dxTextBox'
    | 'dxButtonGroup'
    | 'dxDropDownButton'
  text?: string
  visible?: boolean
  disabled?: boolean
  showText?: 'always' | 'inMenu'
  name?:
    | 'addRowButton'
    | 'applyFilterButton'
    | 'columnChooserButton'
    | 'exportButton'
    | 'groupPanel'
    | 'revertButton'
    | 'saveButton'
    | 'searchPanel'
  cssClass?: CSS.Properties
  locateInMenu?: 'always' | 'auto' | 'never'
  menuItemRender?: (e: any) => JSX.Element
}

export interface IDataGridItemOptions {
  type?: 'back' | 'danger' | 'default' | 'normal' | 'success'
  text?: string
  hint?: string
  visible?: boolean
  disabled?: boolean
  width?: number | string | ((e: any) => number | string)
  height?: number | string | ((e: any) => number | string)
  hoverStateEnabled?: boolean
  icon?: string
  stylingMode?: 'text' | 'outlined' | 'contained'
  tabIndex?: number
  onClick?: (e: any) => void
  onContentReady?: (e: any) => void
  onDisposing?: (e: any) => void
  onInitialized?: (e: any) => void
  onOptionChanged?: (e: any) => void
  render?: (e: any) => JSX.Element
}

export interface IDataGridToolbarButton {
  enabled: boolean
  onClick?: () => void
  options?: any
}
