import config from 'devextreme/core/config'

import ServicesList from './ServicesList/ServicesList'
import ClientsList from './ClientsList/ClientsList'
import PdfPreview from './Preview/Preview'

import styles from './Main.module.css'
import { Enums } from '../../constants/enums'

const Main = (): JSX.Element => {
  config({ defaultCurrency: Enums.DefaultCurrency })

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
