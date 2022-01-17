import { useRef } from 'react'

import Button from '../../_devExtreme/Button/Button'

import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'

import styles from '../Toolbar.module.css'

import { Enums } from '../../../constants/enums'

const MainToolbar = (): JSX.Element => {
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
