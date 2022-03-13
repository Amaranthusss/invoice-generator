import {
  Location,
  NavigateFunction,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { InitializedEventInfo } from 'devextreme/events'
import { useEffect, useRef } from 'react'
import dxButton from 'devextreme/ui/button'

import SettingsToolbar from './SettingsToolbar/SettingsToolbar'
import ArchiveToolbar from './ArchiveToolbar/ArchiveToolbar'
import MainToolbar from './MainToolbar/MainToolbar'
import Button from '../_devExtreme/Button/Button'

import service from './Toolbar.service'

import { IButtonOptions } from '../_devExtreme/Button/Button.interface'

import { appRoutes } from '../../constants/routes'
import { Enums } from '../../constants/enums'

import styles from './Toolbar.module.css'

const Toolbar = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const location: Location = useLocation()
  const mainPageButtonComponent = useRef<dxButton>()
  const archivePageButtonComponent = useRef<dxButton>()
  const settingsPageButtonComponent = useRef<dxButton>()

  useEffect(() => {
    mainPageButtonComponent.current?.option({
      stylingMode: service.getStylingModeBasedAtRoute(appRoutes.main),
    })
    archivePageButtonComponent.current?.option({
      stylingMode: service.getStylingModeBasedAtRoute(appRoutes.archive),
    })
    settingsPageButtonComponent.current?.option({
      stylingMode: service.getStylingModeBasedAtRoute(appRoutes.settings),
    })
  }, [location.pathname])

  const mainPageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.mainPageButton,
    text: Enums.InterfaceTexts.mainPageButton,
    type: 'default',
    icon: 'tableproperties',
    onClick: () => navigate(appRoutes.main),
    onInitialized: (e: InitializedEventInfo<dxButton>) => {
      mainPageButtonComponent.current = e.component
    },
  })

  const settingsPageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.settingsPageButton,
    text: Enums.InterfaceTexts.settingsPageButton,
    type: 'default',
    icon: 'preferences',
    onClick: () => navigate(appRoutes.settings),
    onInitialized: (e: InitializedEventInfo<dxButton>) => {
      settingsPageButtonComponent.current = e.component
    },
  })

  const archivePageButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.archivePageButton,
    text: Enums.InterfaceTexts.archivePageButton,
    type: 'default',
    icon: 'chart',
    onClick: () => navigate(appRoutes.archive),
    onInitialized: (e: InitializedEventInfo<dxButton>) => {
      archivePageButtonComponent.current = e.component
    },
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
        <div className={styles.button}>
          <Button options={settingsPageButtonOptions.current} />
        </div>
      </div>
      <Routes>
        <Route path={appRoutes.main} element={<MainToolbar />} />
        <Route path={appRoutes.archive} element={<ArchiveToolbar />} />
        <Route path={appRoutes.settings} element={<SettingsToolbar />} />
      </Routes>
    </div>
  )
}

export default Toolbar
