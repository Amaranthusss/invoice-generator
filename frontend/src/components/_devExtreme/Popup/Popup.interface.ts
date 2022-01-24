import dxPopup, { dxPopupOptions } from 'devextreme/ui/popup'

export interface IPopupComponent {
  dxPopup?: dxPopup
  repaint?: () => void
}

export interface IPopupOptions extends dxPopupOptions<any> {
  componentCallback?: (component: IPopupComponent) => void
  widthPercents?: number
  heightPercents?: number
  renderChildren?: () => JSX.Element
}
