import { useRef } from 'react'
import Chart from '../devExtreme/Chart/Chart'
import { IChartOptions } from '../devExtreme/Chart/Chart.interface'

import styles from './Archive.module.css'

const Archive = (): JSX.Element => {
  const profitsChartOptions = useRef<IChartOptions>({})

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Chart options={profitsChartOptions.current} />
      </div>
      <div className={styles.column}>B</div>
    </div>
  )
}

export default Archive
