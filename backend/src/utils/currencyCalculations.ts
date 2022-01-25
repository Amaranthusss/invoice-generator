import * as _ from 'lodash'

export const convertBruttoToNetto = (
  brutto: number,
  vatAsPercents: number,
): number => {
  return brutto === 0 ? 0 : _.round((brutto / (100 + vatAsPercents)) * 100, 2)
}
