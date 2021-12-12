import { Calendar } from 'devextreme-react'

import dxService from '../../../../utils/dxService'

import {
  ICalendarEventOnValueChanged,
  ICalendarEventOnInitialized,
  ICalendarPanelOptions,
} from './CalendarPanel.interface'
import { IOptions } from '../../../common/common.interface'

const CalendarPanel = (props: IOptions<ICalendarPanelOptions>): JSX.Element => {
  return (
    <Calendar
      maxZoomLevel={'month'}
      onValueChanged={(e: ICalendarEventOnValueChanged) =>
        dxService.callFromProps(props, 'onValueChanged', e)
      }
      onInitialized={(e: ICalendarEventOnInitialized) =>
        dxService.callFromProps(props, 'onInitialized', e)
      }
      showTodayButton={true}
      height={'100%'}
    />
  )
}

export default CalendarPanel
