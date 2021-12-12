import { ClickEvent } from 'devextreme/ui/button'
import { Enums } from '../../../constants/enums'
import Button from '../../devExtreme/Button/Button'
import { IButtonOptions } from '../../devExtreme/Button/Button.interface'
import DateBox from '../../devExtreme/DateBox/DateBox'

import { IDateBoxOptions } from '../../devExtreme/DateBox/DateBox.interface'

import styles from './InvoiceConfigurator.module.css'

const InvoiceConfigurator = (): JSX.Element => {
  const dateBoxOptions: IDateBoxOptions = {
    type: 'date',
    hint: Enums.InterfaceTexts.invoiceDateOfIssue,
  }
  const sendEmailButtonOptions: IButtonOptions = {
    icon: 'email',
    hint: Enums.InterfaceTexts.sendEmailButton,
    stylingMode: 'contained',
    type: 'default',
    onClick: (e: ClickEvent) => console.log(e),
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonsPanel}>
        <div className={styles.button}>
          <Button options={sendEmailButtonOptions} />
        </div>
      </div>
      <div className={styles.dateBox}>
        <DateBox options={dateBoxOptions} />
      </div>
    </div>
  )
}

export default InvoiceConfigurator
