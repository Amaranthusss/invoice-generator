import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import { useEffect } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import config from 'devextreme/core/config'

import InvoiceConfigurator from './InvoiceConfigurator/InvoiceConfigurator'
import ServicesList from './ServicesList/ServicesList'
import ClientsList from './ClientsList/ClientsList'
import PdfPreview from './Preview/Preview'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setAppSize } from '../../Redux-store/global.reducer'

import styles from './Main.module.css'

import { Enums } from '../../constants/enums'

config({ defaultCurrency: Enums.DefaultCurrency })

const Main = (): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()
  const dispatch: Dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppSize({ width, height }))
  }, [width, height])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.column}>
        <div className={styles.toolbar}>
          <InvoiceConfigurator />
        </div>

        <div className={styles.tables}>
          <div className={styles.table}>
            <ServicesList />
          </div>
          <div className={styles.table}>
            <ClientsList />
          </div>
        </div>
      </div>

      <div className={styles.column}>
        <PdfPreview />
      </div>
    </div>
  )
}

export default Main
