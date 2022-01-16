import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { locale } from 'devextreme/localization'
import config from 'devextreme/core/config'

import ArchivePage from './views/ArchivePage'
import ErrorPage from './views/ErrorPage'
import MainPage from './views/MainPage'
import Toolbar from './components/Toolbar/Toolbar'

import { useAppDispatch } from './hooks/useAppDispatch'
import { setAppSize } from './Redux-store/global.reducer'

import { appRoutes } from './constants/routes'
import { Enums } from './constants/enums'

import 'devextreme/dist/css/dx.light.css'
import './index.css'

locale('pl')
config({ defaultCurrency: Enums.DefaultCurrency })

const App = (): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()
  const dispatch: Dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppSize({ width, height }))
  }, [width, height])

  return (
    <div ref={ref}>
      <Toolbar />
      <Routes>
        <Route path={appRoutes.main} element={<MainPage />} />
        <Route path={appRoutes.archive} element={<ArchivePage />} />
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
