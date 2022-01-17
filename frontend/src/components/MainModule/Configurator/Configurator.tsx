import { useRef } from 'react'

import NumberBox from '../../_devExtreme/NumberBox/NumberBox'
import SelectBox from '../../_devExtreme/SelectBox/SelectBox'
import DateBox from '../../_devExtreme/DateBox/DateBox'
import TextBox from '../../_devExtreme/TextBox/TextBox'

import { INumberBoxOptions } from '../../_devExtreme/NumberBox/NumberBox.interface'
import { ISelectBoxOptions } from '../../_devExtreme/SelectBox/SelectBox.interface'
import { IDateBoxOptions } from '../../_devExtreme/DateBox/DateBox.interface'
import { ITextBoxOptions } from '../../_devExtreme/TextBox/TextBox.interface'

import { Enums } from '../../../constants/enums'

import styles from './Configurator.module.css'
import { Dispatch } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { configuratorFullSize, IConfigurator } from './Configurator.interface'
import { InitializedEventInfo, NativeEventInfo } from 'devextreme/events'
import { ValueChangedInfo } from 'devextreme/ui/editor/editor'
import dxDateBox from 'devextreme/ui/date_box'
import dxNumberBox from 'devextreme/ui/number_box'
import _ from 'lodash'
import { setConfigurator } from '../../../Redux-store/global.reducer'
import dxSelectBox from 'devextreme/ui/select_box'
import dxTextBox from 'devextreme/ui/text_box'

const Configurator = (): JSX.Element => {
  const dispatch: Dispatch = useAppDispatch()
  const configurator = useRef<any>({} as any)

  const onConfiguratorUpdated = (
    elementName: keyof IConfigurator,
    value: string | number
  ): void => {
    configurator.current = _.cloneDeep(configurator.current)
    configurator.current[elementName] = value

    const areAllElementsDefined: boolean = !_.some(
      configurator.current,
      (setting: string | number) => setting == null
    )
    const isConfiguratorFull: boolean =
      _.size(configurator.current) === configuratorFullSize

    if (areAllElementsDefined && isConfiguratorFull) {
      console.log(configurator.current)
      dispatch(setConfigurator(configurator.current))
    }
  }

  const invoiceNameTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceName,
    label: Enums.InterfaceTexts.invoiceName,
    labelMode: 'floating',
    defaultValue: '1/10/2022',
    onInitialized: (e: InitializedEventInfo<dxTextBox>) => {
      onConfiguratorUpdated(
        'invoiceName',
        e.component?.option().value as string
      )
    },
    onValueChanged: (
      e: NativeEventInfo<dxTextBox, Event> & ValueChangedInfo
    ) => {
      onConfiguratorUpdated('invoiceName', e.value)
    },
  })

  const dateOfIssueDateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    type: 'date',
    onValueChanged: (
      e: NativeEventInfo<dxDateBox, Event> & ValueChangedInfo
    ) => {
      onConfiguratorUpdated('dateOfIssue', (e.value as Date).toUTCString())
    },
    onInitialized: (e: InitializedEventInfo<dxDateBox>) => {
      onConfiguratorUpdated(
        'dateOfIssue',
        (e.component?.option().value as Date).toUTCString()
      )
    },
  })

  const methodOfPaymentSelectBoxOptions = useRef<ISelectBoxOptions>({
    hint: Enums.InterfaceTexts.methodOfPayment,
    label: Enums.InterfaceTexts.methodOfPayment,
    labelMode: 'floating',
    items: [
      Enums.InterfaceTexts.methodOfPaymentTransfer,
      Enums.InterfaceTexts.methodOfPaymentCash,
    ],
    defaultValue: Enums.InterfaceTexts.methodOfPaymentTransfer,
    onValueChanged: (
      e: NativeEventInfo<dxSelectBox, any> & ValueChangedInfo
    ) => {
      onConfiguratorUpdated('methodOfPayment', e.value)
    },
    onInitialized: (e: InitializedEventInfo<dxSelectBox>) => {
      onConfiguratorUpdated(
        'methodOfPayment',
        e.component?.option().value as string
      )
    },
  })

  const jobDurationNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.jobDuration,
    label: Enums.InterfaceTexts.jobDuration,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 2,
    showSpinButtons: true,
    onValueChanged: (
      e: NativeEventInfo<dxNumberBox, Event> & ValueChangedInfo
    ) => {
      onConfiguratorUpdated('jobDuration', e.value)
    },
    onInitialized: (e: InitializedEventInfo<dxNumberBox>) => {
      onConfiguratorUpdated(
        'jobDuration',
        e.component?.option().value as number
      )
    },
  })

  const paymentTimeNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.paymentTime,
    label: Enums.InterfaceTexts.paymentTime,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 14,
    showSpinButtons: true,
    onValueChanged: (
      e: NativeEventInfo<dxNumberBox, Event> & ValueChangedInfo
    ) => {
      onConfiguratorUpdated('paymentTime', e.value)
    },
    onInitialized: (e: InitializedEventInfo<dxNumberBox>) => {
      onConfiguratorUpdated(
        'paymentTime',
        e.component?.option().value as number
      )
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.textBox}>
        <TextBox options={invoiceNameTextBoxOptions.current} />
      </div>
      <div className={styles.dateBox}>
        <DateBox options={dateOfIssueDateBoxOptions.current} />
      </div>
      <div className={styles.button}>
        <NumberBox options={paymentTimeNumberBoxOptions.current} />
      </div>
      <div className={styles.selectBox}>
        <SelectBox options={methodOfPaymentSelectBoxOptions.current} />
      </div>
      <div className={styles.button}>
        <NumberBox options={jobDurationNumberBoxOptions.current} />
      </div>
    </div>
  )
}

export default Configurator
