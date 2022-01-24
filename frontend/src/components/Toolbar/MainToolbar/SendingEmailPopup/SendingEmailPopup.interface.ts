import { IPopupComponent } from '../../../_devExtreme/Popup/Popup.interface'

export interface ISendingEmailPopupComponent {
  popupComponent: IPopupComponent | undefined
}

export interface ISendingEmailPopupOptions {
  componentCallback: (component: ISendingEmailPopupComponent) => void
}
