import { useRef } from 'react'
import notify from 'devextreme/ui/notify'

import Button from '../../_devExtreme/Button/Button'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getInvoiceDoc } from '../../../Redux-store/global.reducer'
import { equalityFn } from '../../../utils/equalityFn'
import createInvoicePdfFile from '../../../api/invoices/createFile'
import sendInvoiceEmail from '../../../api/emails/sendInvoiceEmail'

import { ICreateFileDto } from '../../../../../backend/src/invoices/dtos/createFile.interface'
import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'

import styles from '../Toolbar.module.css'

import { Enums } from '../../../constants/enums'
import Popup from '../../_devExtreme/Popup/Popup'
import { IPopupOptions } from '../../_devExtreme/Popup/Popup.interface'
import dxPopup from 'devextreme/ui/popup'
import { InitializedEventInfo } from 'devextreme/events'

const MainToolbar = (): JSX.Element => {
  const invoiceDoc = useRef<ICreateFileDto>()
  const sendingEmailPopupComponent = useRef<dxPopup>()

  const invoiceDocEqualityFn = (nextInvoiceDoc: ICreateFileDto): boolean => {
    const updateInvoiceDoc = (updatedValue: ICreateFileDto) => {
      invoiceDoc.current = updatedValue
    }

    return equalityFn(invoiceDoc.current, nextInvoiceDoc, updateInvoiceDoc)
  }

  useAppSelector(getInvoiceDoc, invoiceDocEqualityFn)

  const sendEmailPopupButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.sendEmailPopupButton,
    text: Enums.InterfaceTexts.sendEmailPopupButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'email',
    onClick: () => sendingEmailPopupComponent.current?.show(),
  })

  const saveInvoicePopupButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.saveInvoiceButton,
    text: Enums.InterfaceTexts.saveInvoiceButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'save',
    onClick: (): void => {
      createInvoicePdfFile(invoiceDoc.current ?? ({} as any))
        .then(() => {
          notify(Enums.InterfaceTexts.savedInvoiceFileSuccess, 'info', 5000)
        })
        .catch((error) => {
          notify(Enums.InterfaceTexts.savedInvoiceFileError, 'error', 5000)
          console.error(error)
        })
    },
  })

  const onSendEmailInvoice = (): void => {
    sendingEmailPopupComponent.current?.hide()
    notify(`Faktura X została przesłana pod adres e-mail Y. 📧`, 'info', 5000)
  }

  const sendingEmailPopupOptions = useRef<IPopupOptions>({
    title: 'Potwierdzenie przesłania faktury',
    dragEnabled: false,
    closeOnOutsideClick: true,
    width: 350,
    height: 250,
    renderChildren: () => (
      <span>
        Czy jesteś pewien, że chcesz wysłać e-mail pod adres
        <hr />
        <span style={{ display: 'flex', justifyContent: 'right' }}>
          Akcja ta nie może zostać cofnięta!
        </span>
      </span>
    ),
    toolbarItems: [
      {
        widget: 'dxButton',
        location: 'before',
        toolbar: 'bottom',
        options: {
          text: 'Potwierdź',
          onClick: onSendEmailInvoice,
        },
      },
      {
        widget: 'dxButton',
        location: 'after',
        toolbar: 'bottom',
        options: {
          text: 'Anuluj',
          onClick: () => sendingEmailPopupComponent.current?.hide(),
        },
      },
    ],
    onInitialized: (e: InitializedEventInfo<dxPopup>) => {
      sendingEmailPopupComponent.current = e.component
    },
  })

  return (
    <div
      className={styles.buttonsPanel}
      style={{
        justifyContent: 'right',
      }}
    >
      <Popup options={sendingEmailPopupOptions.current} />
      <div className={styles.button}>
        <Button options={sendEmailPopupButtonOptions.current} />
      </div>
      <div className={styles.button}>
        <Button options={saveInvoicePopupButtonOptions.current} />
      </div>
    </div>
  )
}

export default MainToolbar
