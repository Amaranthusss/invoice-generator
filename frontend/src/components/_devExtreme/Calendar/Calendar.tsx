import {
  useResizeDetector,
  UseResizeDetectorReturn,
} from 'react-resize-detector'
import Calendar from 'devextreme-react/calendar'

import { ICalendarOptions } from './Calendar.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const CalendarPattern = (props: IOptions<ICalendarOptions>): JSX.Element => {
  const { width, height, ref }: UseResizeDetectorReturn<HTMLDivElement> =
    useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <Calendar {...props.options} width={width} height={height} />
    </div>
  )
}

export default CalendarPattern
