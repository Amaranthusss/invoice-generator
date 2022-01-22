import { dxPopupOptions } from 'devextreme/ui/popup'

export interface IPopupOptions extends dxPopupOptions<any> {
  widthPercents?: number
  heightPercents?: number
  renderChildren?: () => JSX.Element
}
