import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useRef } from 'react'

import ArchiveToolbar from './ArchiveToolbar/ArchiveToolbar'
import Button from '../_devExtreme/Button/Button'

import { IButtonOptions } from '../_devExtreme/Button/Button.interface'

import { Enums } from '../../constants/enums'
import { appRoutes } from '../../constants/routes'

import styles from './Toolbar.module.css'

const Toolbar = (): JSX.Element => {
  const history: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  const mainPageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.mainPageButton,
    text: Enums.InterfaceTexts.mainPageButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'tableproperties',
    onClick: () => history(appRoutes.main),
  })

  const archivePageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.archivePageButton,
    text: Enums.InterfaceTexts.archivePageButton,
    stylingMode: 'contained',
    type: 'default',
    icon: 'chart',
    onClick: () => history(appRoutes.archive),
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
        {location.pathname === appRoutes.archive ? ArchiveToolbar : <span />}
      </div>
    </div>
  )
}

export default Toolbar