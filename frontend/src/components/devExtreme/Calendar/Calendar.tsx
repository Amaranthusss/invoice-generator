import Calendar from 'devextreme-react/calendar'

import { ICalendarOptions } from './Calendar.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const CalendarPattern = (props: IOptions<ICalendarOptions>): JSX.Element => {
  return (
    <div className={resizeDetector.box}>
      <Calendar {...props.options} />
    </div>
  )
}

export default CalendarPattern
