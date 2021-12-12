import CalendarPanel from './CalendarPanel/CalendarPanel'

import {
  ICalendarEventOnValueChanged,
  ICalendarPanelOptions,
} from './CalendarPanel/CalendarPanel.interface'

const InvoiceConfigurator = (): JSX.Element => {
  const onValueChanged = (e: ICalendarEventOnValueChanged) => {
    console.log(e)
  }

  const calendarPanelOptions: ICalendarPanelOptions = {
    onValueChanged,
  }

  return (
    <>
      <CalendarPanel options={calendarPanelOptions} />
    </>
  )
}

export default InvoiceConfigurator
