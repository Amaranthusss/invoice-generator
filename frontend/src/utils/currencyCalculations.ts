import _ from 'lodash'

import { Enums } from '../constants/enums'

export const getBruttoFromNetto = (netto: number): number => {
  const checkedNetto: number = _.isNumber(netto) ? netto : _.toNumber(netto)

  if (!_.isNull(netto) && !_.isNaN(checkedNetto)) {
    return netto * (1 + Enums.VatAsPercents / 100)
  }

  return NaN
}

export const getVatFromNetto = (netto: number): number => {
  if (!_.isNull(netto)) {
    const brutto: number = getBruttoFromNetto(netto)

    return brutto - netto
  }

  return NaN
}
