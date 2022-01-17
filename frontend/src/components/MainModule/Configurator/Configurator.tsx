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

const Configurator = (): JSX.Element => {
  const invoiceNameTextBoxOptions = useRef<ITextBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceName,
    label: Enums.InterfaceTexts.invoiceName,
    labelMode: 'floating',
  })

  const dateOfIssueDateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    type: 'date',
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
  })

  const jobDurationNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.jobDuration,
    label: Enums.InterfaceTexts.jobDuration,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 2,
    showSpinButtons: true,
  })

  const paymentTimeNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.paymentTime,
    label: Enums.InterfaceTexts.paymentTime,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 14,
    showSpinButtons: true,
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
