import Invoices from './Invoices/Invoices'
import Profit from './Profit/Profit'

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
          <Profit />
        </div>
        <div className={styles.column}>
          <Calendar options={{}} />
        </div>
      </div>
    </div>
  )
}

export default Archive
