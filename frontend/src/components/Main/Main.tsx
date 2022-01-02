import config from 'devextreme/core/config'

import InvoiceConfigurator from './InvoiceConfigurator/InvoiceConfigurator'
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
        <div className={styles.toolbar}>
          <InvoiceConfigurator />
        </div>

        <div className={styles.tables}>
          <div className={styles.table}>
            <ServicesList />
          </div>
          <div className={styles.table}>
            <ClientsList />
          </div>
        </div>
      </div>

      <div className={styles.column}>
        <PdfPreview />
      </div>
    </div>
  )
}

export default Main
