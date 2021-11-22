import ServicesList from './ServicesList/ServicesList'
import ClientsList from './ClientsList/ClientsList'
import PdfPreview from './Preview/Preview'

import styles from './Main.module.css'

const Main = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.row}>
          <ServicesList />
        </div>
        <div className={styles.row}>
          <ClientsList />
        </div>
      </div>
      <div className={styles.column}>
        <PdfPreview />
      </div>
    </div>
  )
}

export default Main
