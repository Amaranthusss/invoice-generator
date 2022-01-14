import dxPopup, { PopupInstance } from 'devextreme/ui/popup'
import { InitializedEventInfo } from 'devextreme/events'
import { useRef } from 'react'
import _ from 'lodash'

import Archive from '../../Archive/Archive'
import DateBox from '../../devExtreme/DateBox/DateBox'
import Button from '../../devExtreme/Button/Button'
import Popup from '../../devExtreme/Popup/Popup'

import { IDateBoxOptions } from '../../devExtreme/DateBox/DateBox.interface'
import { IButtonOptions } from '../../devExtreme/Button/Button.interface'
import { IPopupOptions } from '../../devExtreme/Popup/Popup.interface'

import { Enums } from '../../../constants/enums'

import styles from './Toolbar.module.css'

const Toolbar = (): JSX.Element => {
  const archivePopupComponent = useRef<dxPopup>()

  const dateBoxOptions: IDateBoxOptions = {
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    type: 'date',
  }

  const archiveButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.archiveButton,
    text: Enums.InterfaceTexts.archiveButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'chart',
    onClick: () => archivePopupComponent.current?.show(),
  })

  const sendEmailPopupButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.sendEmailPopupButton,
    text: Enums.InterfaceTexts.sendEmailPopupButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'email',
  })

  const saveInvoicePopupButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.saveInvoiceButton,
    text: Enums.InterfaceTexts.saveInvoiceButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'save',
  })

  const cancelPopupButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.cancelButton,
    text: Enums.InterfaceTexts.cancelButton,
    stylingMode: 'contained',
    type: 'default',
    onClick: () => archivePopupComponent.current?.hide(),
  })

  const archivePopupOptions = useRef<IPopupOptions>({
    renderChildren: Archive,
    title: Enums.InterfaceTexts.archiveButton,
    closeOnOutsideClick: true,
    showCloseButton: true,
    dragEnabled: false,
    showTitle: true,
    toolbarItems: [
      {
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'after',
        options: cancelPopupButtonOptions,
      },
    ],
    onInitialized: (e: InitializedEventInfo<PopupInstance>) =>
      (archivePopupComponent.current = e.component),
  })

  return (
    <>
      <Popup options={archivePopupOptions.current} />
      <div className={styles.container}>
        <div className={styles.buttonsPanel}>
          <div className={styles.dateBox}>
            <DateBox options={dateBoxOptions} />
          </div>
          <div className={styles.button}>
            <Button options={archiveButtonOptions.current} />
          </div>
          <div className={styles.button}>
            <Button options={sendEmailPopupButtonOptions.current} />
          </div>
          <div className={styles.button}>
            <Button options={saveInvoicePopupButtonOptions.current} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Toolbar
