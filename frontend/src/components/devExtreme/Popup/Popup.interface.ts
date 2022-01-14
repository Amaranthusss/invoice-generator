import { dxPopupOptions } from 'devextreme/ui/popup'

export interface IPopupOptions extends dxPopupOptions<any> {
  renderChildren: () => JSX.Element
}
