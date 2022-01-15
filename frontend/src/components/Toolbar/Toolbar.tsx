import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import _ from 'lodash'

import DateBox from '../_devExtreme/DateBox/DateBox'
import Button from '../_devExtreme/Button/Button'

import { IDateBoxOptions } from '../_devExtreme/DateBox/DateBox.interface'
import { IButtonOptions } from '../_devExtreme/Button/Button.interface'

import { Enums } from '../../constants/enums'

import styles from './Toolbar.module.css'

const Toolbar = (): JSX.Element => {
  const history: NavigateFunction = useNavigate()

  const dateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    type: 'date',
  })

  const mainPageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.mainPageButton,
    text: Enums.InterfaceTexts.mainPageButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'tableproperties',
    onClick: () => history('/'),
  })

  const archivePageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.archivePageButton,
    text: Enums.InterfaceTexts.archivePageButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'chart',
    onClick: () => history('archive'),
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
    <div className={styles.container}>
      <div className={styles.buttonsPanel} style={{ justifyContent: 'left' }}>
        <div className={styles.button}>
          <Button options={mainPageButtonOptions.current} />
        </div>
        <div className={styles.button}>
          <Button options={archivePageButtonOptions.current} />
        </div>
      </div>
      <div className={styles.buttonsPanel} style={{ justifyContent: 'right' }}>
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
    </div>
  )
}

export default Toolbar
