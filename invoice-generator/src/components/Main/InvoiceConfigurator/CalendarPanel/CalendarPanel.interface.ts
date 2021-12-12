import { NativeEventInfo } from 'devextreme/events'
import dxCalendar from 'devextreme/ui/calendar'
import { ValueChangedInfo } from 'devextreme/ui/editor/editor'

export interface ICalendarPanelOptions {
  onValueChanged?: (e: ICalendarEventOnValueChanged) => void
  onInitialized?: (e: ICalendarEventOnInitialized) => void
}

export type ICalendarEventOnValueChanged = NativeEventInfo<dxCalendar> &
  ValueChangedInfo

export type ICalendarEventOnInitialized = {
  component?: dxCalendar | undefined
  element?: HTMLElement | undefined
}
