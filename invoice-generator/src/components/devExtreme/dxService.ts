import _ from 'lodash'

import { IOptions } from '../components.interface'

const callFromProps = (
  props: IOptions<any>,
  eventName: string,
  devExResponse?: any
): void => {
  if (_.isFunction(props.options[eventName])) {
    props.options[eventName](devExResponse ?? undefined)
  }
}

const dxService = { callFromProps }

export default dxService
