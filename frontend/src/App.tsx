import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { Route, Routes } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { locale } from 'devextreme/localization'
import config from 'devextreme/core/config'

import SettingsPage from './views/SettingsPage'
import ArchivePage from './views/ArchivePage'
import ErrorPage from './views/ErrorPage'
import MainPage from './views/MainPage'
import Toolbar from './components/Toolbar/Toolbar'

import { useAppDispatch } from './hooks/useAppDispatch'
import { setAppSize, setFirmData } from './Redux-store/global.reducer'
import getFirmData from './api/firmData/getFirmData'
import service from './App.service'

import { IFirmDataDto } from '../../backend/src/firm-data/dtos/save.interface'
import { IFirmData } from './Redux-store/global.reducer.interface'

import { appRoutes } from './constants/routes'
import { Enums } from './constants/enums'

import 'devextreme/dist/css/dx.material.blue.light.compact.css'
import './index.css'

locale('pl')
config({ defaultCurrency: Enums.DefaultCurrency })

const App = (): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()
  const dispatch: Dispatch = useAppDispatch()

  useEffect(() => {
    const getFirmDataAndSaveToRedux = async (): Promise<void> => {
      const response: AxiosResponse<IFirmDataDto> = await getFirmData()
      const firmData: IFirmData = service.transformFirmDataDtoToFirmDataObject(
        response.data
      )

      dispatch(setFirmData(firmData))
    }

    getFirmDataAndSaveToRedux()
  }, [dispatch])

  useEffect(() => {
    dispatch(setAppSize({ width, height }))
  }, [width, height, dispatch])

  return (
    <div ref={ref}>
      <Toolbar />
      <div style={{ height: 'calc(100vh - 55px)', width: '100vw' }}>
        <Routes>
          <Route path={appRoutes.main} element={<MainPage />} />
          <Route path={appRoutes.archive} element={<ArchivePage />} />
          <Route path={appRoutes.settings} element={<SettingsPage />} />
          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
