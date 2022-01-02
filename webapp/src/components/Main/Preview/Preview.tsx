import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { useRef } from 'react'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake'
import _ from 'lodash'

import {
  getClientFirm,
  getServices,
  IServices,
} from '../../../Redux-store/global.slice'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { updatePdfBody } from '../../../utils/updatePdfBody'
import { equalityFn } from '../../../utils/equalityFn'

import { IClientsListClientFirmData } from '../ClientsList/ClientsList.interface'

import styles from './Preview.module.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const PdfPreview = (): JSX.Element => {
  const previewRef = useRef<HTMLIFrameElement>(null)
  const clientFirm = useRef<IClientsListClientFirmData | null>(null)
  const services = useRef<IServices | null>(null)

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

  useAppSelector(getClientFirm, clientFirmEqualityFn)
  useAppSelector(getServices, servicesEqualityFn)

  const onDocDataChanged = (): void => {
    if (previewRef != null && previewRef.current != null) {
      const documentDefinitions: TDocumentDefinitions = updatePdfBody(
        services.current,
        clientFirm.current
      )
      const doc: TCreatedPdf = pdfMake.createPdf(documentDefinitions)

      doc.getDataUrl((dataUrl: string) => {
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
