import _ from 'lodash'

const currencyAsWords = (currency: number): string => {
  const fraction: string =
    currency % 1 > 0.1 && currency % 1 !== 0
      ? `${_.round((currency % 1) * 100)}`
      : `0${_.round((currency % 1) * 100)}`

  const lastNumber: number =
    currency > 11 && currency < 15 ? 5 : (currency - (currency % 1)) % 10
  const isThatOne: boolean = _.floor(currency) === 1
  const isThatZero: boolean = _.floor(currency) === 0

  const unity: string[] = [
    '',
    ' jeden',
    ' dwa',
    ' trzy',
    ' cztery',
    ' pięć',
    ' sześć',
    ' siedem',
    ' osiem',
    ' dziewięć',
  ]

  const teen: string[] = [
    '',
    ' jedenaście',
    ' dwanaście',
    ' trzynaście',
    ' czternaście',
    ' piętnaście',
    ' szesnaście',
    ' siedemnaście',
    ' osiemnaście',
    ' dziewietnaście',
  ]

  const tens: string[] = [
    '',
    ' dziesięć',
    ' dwadzieścia',
    ' trzydzieści',
    ' czterdzieści',
    ' pięćdziesiąt',
    ' sześćdziesiąt',
    ' siedemdziesiąt',
    ' osiemdziesiąt',
    ' dziewięćdziesiąt',
  ]

  const hundreds: string[] = [
    '',
    ' sto',
    ' dwieście',
    ' trzysta',
    ' czterysta',
    ' pięćset',
    ' sześćset',
    ' siedemset',
    ' osiemset',
    ' dziewięćset',
  ]

  const groupes = [
    ['', '', ''],
    [' tysiąc', ' tysiące', ' tysięcy'],
    [' milion', ' miliony', ' milionów'],
    [' miliard', ' miliardy', ' miliardów'],
    [' bilion', ' biliony', ' bilionów'],
    [' biliard', ' biliardy', ' biliardów'],
    [' trylion', ' tryliony', ' trylionów'],
  ]

  let results = ''
  let chart = ''
  if (isThatZero) results = ' zero'
  if (currency < 0) {
    chart = 'minus'
    currency = -currency
  }

  let g = 0
  while (currency > 0) {
    let s = _.floor((currency % 1000) / 100)
    let n = 0
    let d = _.floor((currency % 100) / 10)
    let j = _.floor(currency % 10)

    if (d == 1 && j > 0) {
      n = j
      d = 0
      j = 0
    }

    let k = 2
    if (j == 1 && s + d + n == 0) k = 0
    if (j == 2 || j == 3 || j == 4) k = 1
    if (s + d + n + j > 0) {
      results =
        hundreds[s] + tens[d] + teen[n] + unity[j] + groupes[g][k] + results
    }

    g++
    currency = _.floor(currency / 1000)
  }

  const valueAsString: string = (chart + results).substring(1)
  const currencyAsString: string = isThatOne
    ? 'złoty'
    : lastNumber > 1 && lastNumber < 5
    ? 'złote'
    : 'złotych'
  const currencyAsWordsOutput: string = `${valueAsString} ${currencyAsString} ${fraction}/100`

  return currencyAsWordsOutput
}

export default currencyAsWords
