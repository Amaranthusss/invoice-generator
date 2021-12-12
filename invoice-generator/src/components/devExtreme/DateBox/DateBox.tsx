import { DateBox } from 'devextreme-react'

import dxService from '../../../utils/dxService'

import {
  IDateBoxEventOnValueChanged,
  IDateBoxOptions,
} from './DateBox.interface'
import { IOptions } from '../../components.interface'

const DateBoxWrapper = (props: IOptions<IDateBoxOptions>): JSX.Element => {
  return (
    <DateBox
      onValueChanged={(e: IDateBoxEventOnValueChanged) =>
        dxService.callFromProps(props, 'onValueChanged', e)
      }
    />
  )
}

export default DateBoxWrapper
