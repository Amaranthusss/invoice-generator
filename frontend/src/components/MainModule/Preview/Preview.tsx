import { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake'
import { Dispatch } from '@reduxjs/toolkit'
import { useRef } from 'react'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import _ from 'lodash'

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

pdfMake.vfs = pdfFonts.pdfMake.vfs

const PdfPreview = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()
  const previewRef = useRef<HTMLIFrameElement>(null)
  const clientFirm = useRef<IClientsListClientFirmData | null>(null)
  const services = useRef<IServices | null>(null)
  const configurator = useRef<IConfigurator | null>(null)

  const clientFirmEqualityFn = (
    nextClientFirm: IClientsListClientFirmData | null
  ): boolean => {
    const updateClientFirm = (
      updatedValue: IClientsListClientFirmData | null
    ) => {
      clientFirm.current = updatedValue
      onDocDataChanged()
    }

    return equalityFn(clientFirm.current, nextClientFirm, updateClientFirm)
  }

  const servicesEqualityFn = (nextServices: IServices): boolean => {
    const updateServices = (updatedValue: IServices | null) => {
      services.current = updatedValue
      onDocDataChanged()
    }

    return equalityFn(services.current, nextServices, updateServices)
  }

  const configuratorEqualityFn = (
    nextConfigurator: IConfigurator | null
  ): boolean => {
    const updateConfigurator = (updatedValue: IConfigurator) => {
      configurator.current = updatedValue
      onDocDataChanged()
    }

    return equalityFn(
      configurator.current,
      nextConfigurator,
      updateConfigurator
    )
  }

  useAppSelector(getClientFirm, clientFirmEqualityFn)
  useAppSelector(getServices, servicesEqualityFn)
  useAppSelector(getConfigurator, configuratorEqualityFn)

  const onDocDataChanged = (): void => {
    if (previewRef != null && previewRef.current != null) {
      const documentDefinitions: TDocumentDefinitions = updatePdfBody(
        services.current,
        clientFirm.current,
        configurator.current
      )
      const doc: TCreatedPdf = pdfMake.createPdf(documentDefinitions)

      doc.getBase64((base64: string): void => {
        console.log(base64)
        const year: string = _.toString(new Date().getFullYear())
        const month: string =
          _.size(_.toString(new Date().getMonth() + 1)) === 1
            ? `0${_.toString(new Date().getMonth() + 1)}`
            : _.toString(new Date().getMonth() + 1)
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
  }

  return (
    <iframe ref={previewRef} title={'pdf-preview'} className={styles.iframe} />
  )
}

export default PdfPreview
