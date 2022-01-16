import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import Button from '../_devExtreme/Button/Button'

import { IButtonOptions } from '../_devExtreme/Button/Button.interface'

import { appRoutes } from '../../constants/routes'
import { Enums } from '../../constants/enums'

import styles from './ErrorModule.module.css'

const ErrorModule = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()

  const navigateButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.errorPageNagivateButton,
    text: Enums.InterfaceTexts.errorPageNagivateButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'globe',
    onClick: () => navigate(appRoutes.main),
  })

  return (
    <div className={styles.container}>
      <div className={styles.text}>{Enums.InterfaceTexts.errorPageText}</div>
      <div className={styles.buttonPanel}>
        <div className={styles.button}>
          <Button options={navigateButtonOptions.current} />
        </div>
      </div>
    </div>
  )
}

export default ErrorModule
