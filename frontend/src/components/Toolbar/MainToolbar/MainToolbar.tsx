import { useRef } from 'react'
import notify from 'devextreme/ui/notify'

import Button from '../../_devExtreme/Button/Button'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getInvoiceDoc } from '../../../Redux-store/global.reducer'
import { equalityFn } from '../../../utils/equalityFn'
import createInvoicePdfFile from '../../../api/invoices/createFile'

import { ICreateFileDto } from '../../../../../backend/src/invoices/dtos/createFile.interface'
import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'

import styles from '../Toolbar.module.css'

import { Enums } from '../../../constants/enums'

const MainToolbar = (): JSX.Element => {
  const invoiceDoc = useRef<ICreateFileDto>()

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

  return (
    <div
      className={styles.buttonsPanel}
      style={{
        justifyContent: 'right',
      }}
    >
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
