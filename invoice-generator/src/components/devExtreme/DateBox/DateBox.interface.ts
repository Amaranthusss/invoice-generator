import { ValueChangedInfo } from 'devextreme/ui/editor/editor'
import { NativeEventInfo } from 'devextreme/events'
import dxDateBox from 'devextreme/ui/date_box'

export interface IDateBoxOptions {
  onValueChanged?: (e: IDateBoxEventOnValueChanged) => void
}

export type IDateBoxEventOnValueChanged = NativeEventInfo<dxDateBox> &
  ValueChangedInfo
