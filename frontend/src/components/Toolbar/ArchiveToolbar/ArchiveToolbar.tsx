import { Location, useLocation } from 'react-router-dom'
import { useRef } from 'react'

import DateBox from '../../_devExtreme/DateBox/DateBox'
import Button from '../../_devExtreme/Button/Button'

import { IDateBoxOptions } from '../../_devExtreme/DateBox/DateBox.interface'
import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'

import styles from '../Toolbar.module.css'

import { Enums } from '../../../constants/enums'

import { appRoutes } from '../../../constants/routes'

const ArchiveToolbar = (): JSX.Element => {
  const location: Location = useLocation()

  const getDisplayStyle = (): 'flex' | 'none' => {
    return location.pathname === appRoutes.archive ? 'flex' : 'none'
  }

  const dateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    type: 'date',
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
      style={{ justifyContent: 'right', display: getDisplayStyle() }}
    >
      <div className={styles.dateBox}>
        <DateBox options={dateBoxOptions.current} />
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

export default ArchiveToolbar
