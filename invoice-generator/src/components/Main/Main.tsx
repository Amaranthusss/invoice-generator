import Grid from '../common/grid/Grid'
import PdfPreview from './PdfPreview/PdfPreview'

import { gridOptions } from './Main.options'

import styles from './Main.module.css'

const Main = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <PdfPreview />
      </div>
      <div className={styles.column}>
        <Grid options={gridOptions} />
      </div>
    </div>
  )
}

export default Main
