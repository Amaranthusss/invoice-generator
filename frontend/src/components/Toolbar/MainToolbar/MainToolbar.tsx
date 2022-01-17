import { useRef } from 'react'

import NumberBox from '../../_devExtreme/NumberBox/NumberBox'
import DateBox from '../../_devExtreme/DateBox/DateBox'
import Button from '../../_devExtreme/Button/Button'

import { INumberBoxOptions } from 'devextreme-react/number-box'
import { IDateBoxOptions } from '../../_devExtreme/DateBox/DateBox.interface'
import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'

import styles from '../Toolbar.module.css'

import { Enums } from '../../../constants/enums'

const MainToolbar = (): JSX.Element => {
  const dateOfIssueDateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    type: 'date',
  })

  const paymentTimeNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 2,
    showSpinButtons: true,
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

  return (
    <div
      className={styles.buttonsPanel}
      style={{
        justifyContent: 'right',
      }}
    >
      <div className={styles.dateBox}>
        <DateBox options={dateOfIssueDateBoxOptions.current} />
      </div>
      <div className={styles.button}>
        <NumberBox options={paymentTimeNumberBoxOptions.current} />
      </div>
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
