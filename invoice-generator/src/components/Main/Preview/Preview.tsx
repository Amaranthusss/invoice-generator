import { useRef } from 'react'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getPdfDoc } from '../../../store/global.slice'

import styles from './Preview.module.css'

const PdfPreview = (): JSX.Element => {
  const previewRef = useRef<HTMLIFrameElement>(null)

  const onChangePdfDoc = (nextPdfDoc: string): boolean => {
    if (previewRef != null && previewRef.current != null) {
      previewRef.current.src = nextPdfDoc
    }

    return true
  }
  useAppSelector<string>(getPdfDoc, onChangePdfDoc)

  return <iframe ref={previewRef} title={'pdf-preview'} className={styles.iframe}/>
}

export default PdfPreview
