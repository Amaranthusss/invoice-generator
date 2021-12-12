import dxDateBox, { dxDateBoxOptions } from 'devextreme/ui/date_box'
import { ValueChangedInfo } from 'devextreme/ui/editor/editor'
import { NativeEventInfo } from 'devextreme/events'

export interface IDateBoxOptions extends dxDateBoxOptions {}

export type IDateBoxEventOnValueChanged = NativeEventInfo<dxDateBox> &
  ValueChangedInfo
