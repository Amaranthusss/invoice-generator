import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { useCallback, useRef } from 'react'
import { TCreatedPdf } from 'pdfmake/build/pdfmake'
import { Dispatch } from '@reduxjs/toolkit'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import _ from 'lodash'

import Button from '../../_devExtreme/Button/Button'

import {
  getClientFirm,
  getConfigurator,
  getServices,
  setInvoiceDoc,
} from '../../../Redux-store/global.reducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { updatePdfBody } from '../../../utils/updatePdfBody'
import { equalityFn } from '../../../utils/equalityFn'

import { IClientsListClientFirmData } from '../ClientsList/ClientsList.interface'
import { ICreateFileDto } from '../../../../../backend/src/invoices/dtos/createFile.interface'
import { IConfigurator } from '../Configurator/Configurator.interface'
import { IServices } from '../../../Redux-store/global.reducer.interface'

import styles from './Preview.module.css'
import { IButtonOptions } from '../../_devExtreme/Button/Button.interface'
import {
  IPreviewStates,
  IPreviewButtonStylingMode,
  IPreviewButtonName,
} from './Preview.interface'
import { Enums } from '../../../constants/enums'
import { InitializedEventInfo } from 'devextreme/events'
import dxButton from 'devextreme/ui/button'

pdfMake.vfs = pdfFonts.pdfMake.vfs
const localStorageItemName: string = 'preview-states'

const PdfPreview = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()
  const previewRef = useRef<HTMLIFrameElement>(null)
  const clientFirm = useRef<IClientsListClientFirmData | null>(null)
  const services = useRef<IServices | null>(null)
  const configurator = useRef<IConfigurator | null>(null)

  const clientFirmEqualityFn = useCallback(
    (nextClientFirm: IClientsListClientFirmData | null): boolean => {
      const updateClientFirm = (
        updatedValue: IClientsListClientFirmData | null
      ) => {
        clientFirm.current = updatedValue
        onDocDataChanged()
      }

      return equalityFn(clientFirm.current, nextClientFirm, updateClientFirm)
    },
    []
  )

  const servicesEqualityFn = useCallback((nextServices: IServices): boolean => {
    const updateServices = (updatedValue: IServices | null) => {
      services.current = updatedValue
      onDocDataChanged()
    }

    return equalityFn(services.current, nextServices, updateServices)
  }, [])

  const configuratorEqualityFn = useCallback(
    (nextConfigurator: IConfigurator | null): boolean => {
      const updateConfigurator = (updatedValue: IConfigurator) => {
        configurator.current = updatedValue
        onDocDataChanged()
      }

      return equalityFn(
        configurator.current,
        nextConfigurator,
        updateConfigurator
      )
    },
    []
  )

  useAppSelector(getClientFirm, clientFirmEqualityFn)
  useAppSelector(getServices, servicesEqualityFn)
  useAppSelector(getConfigurator, configuratorEqualityFn)

  const onDocDataChanged = useCallback((): void => {
    if (previewRef != null && previewRef.current != null) {
      const documentDefinitions: TDocumentDefinitions = updatePdfBody(
        services.current,
        clientFirm.current,
        configurator.current
      )
      const doc: TCreatedPdf = pdfMake.createPdf(documentDefinitions)

      doc.getBase64((base64: string): void => {
        const dateOfIssue: Date =
          configurator.current?.dateOfIssue != null
            ? new Date(configurator.current?.dateOfIssue)
            : new Date()
        const year: string = _.toString(dateOfIssue.getFullYear())
        const month: string =
          _.size(_.toString(dateOfIssue.getMonth() + 1)) === 1
            ? `0${_.toString(dateOfIssue.getMonth() + 1)}`
            : _.toString(dateOfIssue.getMonth() + 1)
        const fileName: string =
          _.replace(configurator.current?.invoiceName ?? '', /\//g, '-') ??
          `100-${month}-${year}`
        const invoiceDoc: ICreateFileDto = { year, month, fileName, base64 }

        dispatch(setInvoiceDoc(invoiceDoc))
      })

      doc.getDataUrl((dataUrl: string): void => {
        if (!_.isNull(dataUrl) && !_.isNull(previewRef.current)) {
          previewRef.current.src = dataUrl
        }
      })
    }
  }, [])

  const invoicePreviewButton = useRef<dxButton>()
  const protocolPreviewButton = useRef<dxButton>()

  const loadPreviewButtonStates = useCallback((): void => {
    let previewStates: IPreviewStates
    const localStoragePreviewStates: string | null =
      localStorage.getItem(localStorageItemName)

    if (localStoragePreviewStates != null) {
      previewStates = JSON.parse(localStoragePreviewStates)
    } else {
      previewStates = { invoice: 'contained', protocol: 'outlined' }
    }

    setTimeout(() => {
      invoicePreviewButton.current?.option({
        stylingMode: previewStates.invoice,
      })
      protocolPreviewButton.current?.option({
        stylingMode: previewStates.protocol,
      })
    })
  }, [])

  const savePreviewButtonState = useCallback(
    (button: IPreviewButtonName): void => {
      const previewStates: IPreviewStates = {
        invoice: 'outlined',
        protocol: 'outlined',
      }

      previewStates[button] = 'contained'
      localStorage.setItem(localStorageItemName, JSON.stringify(previewStates))

      switch (button) {
        case 'invoice':
          invoicePreviewButton.current?.option({ stylingMode: 'contained' })
          protocolPreviewButton.current?.option({ stylingMode: 'outlined' })
          break
        case 'protocol':
          invoicePreviewButton.current?.option({ stylingMode: 'outlined' })
          protocolPreviewButton.current?.option({ stylingMode: 'contained' })
          break
      }
    },
    []
  )

  const invoicePreviewButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.previewSelector.invoiceSelectorButton,
    text: Enums.InterfaceTexts.previewSelector.invoiceSelectorButton,
    type: 'default',
    icon: 'textdocument',
    onClick: () => savePreviewButtonState('invoice'),
    onInitialized: (e: InitializedEventInfo<dxButton>): void => {
      invoicePreviewButton.current = e.component
    },
  })

  const protocolPreviewButtonOptions = useRef<IButtonOptions>({
    hint: Enums.InterfaceTexts.previewSelector.protocolSelectorButton,
    text: Enums.InterfaceTexts.previewSelector.protocolSelectorButton,
    type: 'default',
    icon: 'selectall',
    onClick: () => savePreviewButtonState('protocol'),
    onInitialized: (e: InitializedEventInfo<dxButton>): void => {
      protocolPreviewButton.current = e.component
      loadPreviewButtonStates()
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <span className={styles.button}>
          <Button options={invoicePreviewButtonOptions.current} />
        </span>
        <span className={styles.button}>
          <Button options={protocolPreviewButtonOptions.current} />
        </span>
      </div>

      <iframe
        ref={previewRef}
        title={'pdf-preview'}
        className={styles.iframe}
      />
    </div>
  )
}

export default PdfPreview
