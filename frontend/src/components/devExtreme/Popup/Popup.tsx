import { dxPopupOptions } from 'devextreme/ui/popup'
import { Popup } from 'devextreme-react'

import { useRef } from 'react'
import _ from 'lodash'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { getAppSize } from '../../../Redux-store/global.reducer'

import { IPopupOptions } from './Popup.interface'
import { IAppSize } from '../../../Redux-store/global.reducer.interface'
import { IOptions } from '../../components.interface'

import { defaultPopupSize } from './Popup.config'

const PopupWrapper = (props: IOptions<IPopupOptions>): JSX.Element => {
  const popupSize = useRef<IAppSize>(defaultPopupSize)

  const appSizeEqualityFn = (nextAppSize: IAppSize): boolean => {
    popupSize.current = {
      width: !_.isUndefined(nextAppSize.width)
        ? nextAppSize.width * 0.8
        : defaultPopupSize.width,
      height: !_.isUndefined(nextAppSize.height)
        ? nextAppSize.height * 0.8
        : defaultPopupSize.height,
    }
    return true
  }

  useAppSelector(getAppSize, appSizeEqualityFn)

  const getOptionsExceptParams = (): dxPopupOptions<any> => {
    return _.omit(props.options, ['children'])
  }

  return (
    <Popup {...getOptionsExceptParams()}>
      {props.options.renderChildren()}
    </Popup>
  )
}

export default PopupWrapper
