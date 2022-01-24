import { InitializedEventInfo } from 'devextreme/events'
import { useEffect, useRef, useState } from 'react'
import PopupPattern from '../../../_devExtreme/Popup/Popup'
import dxPopup from 'devextreme/ui/popup'
import notify from 'devextreme/ui/notify'
import _ from 'lodash'

import {
  getClientFirm,
  getInvoiceDoc,
} from '../../../../Redux-store/global.reducer'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { equalityFn } from '../../../../utils/equalityFn'
import sendInvoiceEmail from '../../../../api/emails/sendInvoiceEmail'

import { IClientsListClientFirmData } from '../../../MainModule/ClientsList/ClientsList.interface'
import { ISendingEmailPopupOptions } from './SendingEmailPopup.interface'
import { ICreateFileDto } from '../../../../../../backend/src/invoices/dtos/createFile.interface'
import { ISendEmailDto } from '../../../../../../backend/src/emails/dtos/send.interface'
import {
  IPopupComponent,
  IPopupOptions,
} from '../../../_devExtreme/Popup/Popup.interface'
import { IOptions } from '../../../components.interface'

import { Enums } from '../../../../constants/enums'

const SendingEmailPopup = (
  props: IOptions<ISendingEmailPopupOptions>
): JSX.Element => {
  const clientEmail = useRef<string>()
  const popupComponent = useRef<IPopupComponent>()
  const invoiceDoc = useRef<ICreateFileDto>()

  useEffect(() => {
    props.options.componentCallback({ popupComponent: popupComponent.current })
  }, [])

  const invoiceDocEqualityFn = (nextInvoiceDoc: ICreateFileDto): boolean => {
    const updateInvoiceDoc = (updatedValue: ICreateFileDto) => {
      invoiceDoc.current = updatedValue
    }

    return equalityFn(invoiceDoc.current, nextInvoiceDoc, updateInvoiceDoc)
  }

  const clientFirmEqualithFn = (
    nextClientFirm: IClientsListClientFirmData | null
  ): boolean => {
    const updateClientEmail = (updatedValue: string) => {
      if (_.isFunction(popupComponent.current?.repaint)) {
        clientEmail.current = updatedValue
        popupComponent.current?.repaint()
      }
    }

    return equalityFn(
      clientEmail.current,
      nextClientFirm?.email,
      updateClientEmail
    )
  }

  useAppSelector(getInvoiceDoc, invoiceDocEqualityFn)
  useAppSelector(getClientFirm, clientFirmEqualithFn)

  const onSendEmailInvoice = (): void => {
    if (clientEmail.current == null || invoiceDoc.current == null) return

    const sendEmailOptions: ISendEmailDto = {
      email: clientEmail.current,
      fileName: invoiceDoc.current.fileName,
      month: invoiceDoc.current.month,
      year: invoiceDoc.current.year,
    }

    sendInvoiceEmail(sendEmailOptions)
      .then(() => {
        notify(
          Enums.InterfaceTexts.sendingEmailPopup.successText(
            invoiceDoc.current?.fileName as string,
            clientEmail.current as string
          ),
          'info',
          5000
        )
      })
      .catch((error) => {
        console.error(error)
        notify(
          Enums.InterfaceTexts.sendingEmailPopup.errorText(
            invoiceDoc.current?.fileName as string,
            clientEmail.current as string
          ),
          'error',
          5000
        )
      })
      .finally(() => {
        popupComponent.current?.dxPopup?.hide()
      })
  }

  const renderPopupContent = (): JSX.Element => {
    return (
      <span>
        {Enums.InterfaceTexts.sendingEmailPopup.confirmText}
        &nbsp;<b>{clientEmail.current}</b>?
        <hr />
        <span
          style={{
            justifyContent: 'right',
            fontStyle: 'italic',
            display: 'flex',
            color: 'red',
          }}
        >
          {Enums.InterfaceTexts.sendingEmailPopup.warningText}
        </span>
      </span>
    )
  }

  const sendingEmailPopupOptions = useRef<IPopupOptions>({
    title: Enums.InterfaceTexts.sendingEmailPopup.title,
    renderChildren: renderPopupContent,
    closeOnOutsideClick: true,
    dragEnabled: false,
    width: 350,
    height: 250,
    toolbarItems: [
      {
        widget: 'dxButton',
        location: 'before',
        toolbar: 'bottom',
        options: {
          text: Enums.InterfaceTexts.confirmButton,
          onClick: onSendEmailInvoice,
          icon: 'email',
        },
      },
      {
        widget: 'dxButton',
        location: 'after',
        toolbar: 'bottom',
        options: {
          text: Enums.InterfaceTexts.cancelButton,
          onClick: () => popupComponent.current?.dxPopup?.hide(),
          icon: 'undo',
        },
      },
    ],
    componentCallback: (component: IPopupComponent) => {
      popupComponent.current = component
    },
  })

  return <PopupPattern options={sendingEmailPopupOptions.current} />
}

export default SendingEmailPopup
