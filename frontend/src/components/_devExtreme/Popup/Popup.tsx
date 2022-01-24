import { useEffect, useRef, useState } from 'react'
import dxPopup, { dxPopupOptions } from 'devextreme/ui/popup'
import { InitializedEventInfo } from 'devextreme/events'
import { Popup } from 'devextreme-react'
import _ from 'lodash'

import { IPopupOptions } from './Popup.interface'
import { IOptions } from '../../components.interface'

const PopupPattern = (props: IOptions<IPopupOptions>): JSX.Element => {
  const [, forceUpdate] = useState<number>()
  const dxPopup = useRef<dxPopup>()

  useEffect(() => {
    if (_.isFunction(props.options.componentCallback)) {
      props.options.componentCallback({
        repaint: () => forceUpdate(Math.random()),
        dxPopup: dxPopup.current,
      })
    }
  }, [])

  const onInitialized = (e: InitializedEventInfo<dxPopup>): void => {
    dxPopup.current = e.component

    if (_.isFunction(props.options.onInitialized)) {
      props.options.onInitialized(e)
    }
  }
  const getOptionsExceptParams = (): dxPopupOptions<any> => {
    return _.omit(props.options, [
      'children',
      'renderChildren',
      'onInitialized',
    ])
  }

  const renderChildren = (): JSX.Element => {
    if (_.isFunction(props.options.renderChildren)) {
      return props.options.renderChildren()
    }

    return <span />
  }

  return (
    <Popup onInitialized={onInitialized} {...getOptionsExceptParams()}>
      {renderChildren()}
    </Popup>
  )
}

export default PopupPattern
