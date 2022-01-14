import { useResizeDetector } from 'react-resize-detector'
import { DateBox } from 'devextreme-react'

import dxService from '../dxService'

import {
  IDateBoxEventOnValueChanged,
  IDateBoxOptions,
} from './DateBox.interface'
import { IOptions } from '../../components.interface'

import resizeDetector from '../resizeDetector.module.css'

const DateBoxPattern = (props: IOptions<IDateBoxOptions>): JSX.Element => {
  const { width, height, ref } = useResizeDetector<HTMLDivElement>()

  return (
    <div className={resizeDetector.box} ref={ref}>
      <DateBox
        {...props.options}
        value={new Date()}
        width={width}
        height={height}
        onValueChanged={(e: IDateBoxEventOnValueChanged) =>
          dxService.callFromProps(props, 'onValueChanged', e)
        }
      />
    </div>
  )
}

export default DateBoxPattern
