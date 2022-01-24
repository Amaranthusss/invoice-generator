import Invoices from './Invoices/Invoices'
import Profit from './Profit/Profit'

import styles from './Archive.module.css'

const Archive = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Invoices />
      </div>
      <div className={styles.column}>
        <Profit />
      </div>
    </div>
  )
}

export default Archive
