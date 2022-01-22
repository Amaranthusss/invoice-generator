import { dxPopupOptions } from 'devextreme/ui/popup'
import { Popup } from 'devextreme-react'
import _ from 'lodash'

import { IPopupOptions } from './Popup.interface'
import { IOptions } from '../../components.interface'

const PopupPattern = (props: IOptions<IPopupOptions>): JSX.Element => {
  const getOptionsExceptParams = (): dxPopupOptions<any> => {
    return _.omit(props.options, ['children'])
  }

  const renderChildren = (): JSX.Element => {
    if (_.isFunction(props.options.renderChildren)) {
      return props.options.renderChildren()
    }

    return <span />
  }

  return <Popup {...getOptionsExceptParams()}>{renderChildren()}</Popup>
}

export default PopupPattern
