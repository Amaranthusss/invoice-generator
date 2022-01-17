import { useRef } from 'react'

import NumberBox from '../../_devExtreme/NumberBox/NumberBox'
import DateBox from '../../_devExtreme/DateBox/DateBox'

import { INumberBoxOptions } from '../../_devExtreme/NumberBox/NumberBox.interface'
import { IDateBoxOptions } from '../../_devExtreme/DateBox/DateBox.interface'

import { Enums } from '../../../constants/enums'

import styles from './Configurator.module.css'

const Configurator = (): JSX.Element => {
  const dateOfIssueDateBoxOptions = useRef<IDateBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    type: 'date',
  })

  const paymentTimeNumberBoxOptions = useRef<INumberBoxOptions>({
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
    label: Enums.InterfaceTexts.invoiceDateOfIssue,
    labelMode: 'floating',
    mode: 'number',
    min: 1,
    defaultValue: 2,
    showSpinButtons: true,
  })

  return (
    <div className={styles.container}>
      <div className={styles.dateBox}>
        <DateBox options={dateOfIssueDateBoxOptions.current} />
      </div>
      <div className={styles.button}>
        <NumberBox options={paymentTimeNumberBoxOptions.current} />
      </div>
    </div>
  )
}

export default Configurator
