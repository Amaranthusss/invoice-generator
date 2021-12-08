import _ from 'lodash'

export const equalityFn = (
  prevValue: any,
  nextValue: any,
  updateValue: (value: any) => void
): boolean => {
  if (!_.isEqual(prevValue, nextValue) && !_.isNull(nextValue)) {
    if (_.isFunction(updateValue)) {
      updateValue(nextValue)
    }
  }
  return true
}
