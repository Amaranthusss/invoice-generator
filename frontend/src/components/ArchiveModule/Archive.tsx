import Invoices from './Invoices/Invoices'
import Profits from './Profits/Profits'

import styles from './Archive.module.css'
import Calendar from '../_devExtreme/Calendar/Calendar'

const Archive = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Invoices />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <Profits />
        </div>
        <div className={styles.column}>
          <Calendar options={{}} />
        </div>
      </div>
    </div>
  )
}

export default Archive
