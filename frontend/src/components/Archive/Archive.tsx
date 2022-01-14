import { useRef } from 'react'

import Calendar from '../devExtreme/Calendar/Calendar'
import Chart from '../devExtreme/Chart/Chart'

import { ICalendarOptions } from '../devExtreme/Calendar/Calendar.interface'
import { IChartOptions } from '../devExtreme/Chart/Chart.interface'

import styles from './Archive.module.css'

const Archive = (): JSX.Element => {
  const profitsChartOptions = useRef<IChartOptions>({})
  const invoicesCalendarOptions = useRef<ICalendarOptions>({})

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Calendar options={invoicesCalendarOptions.current} />
      </div>
      <div className={styles.column}>
        <Chart options={profitsChartOptions.current} />
      </div>
    </div>
  )
}

export default Archive
