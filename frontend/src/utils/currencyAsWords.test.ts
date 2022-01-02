import _ from 'lodash'
import currencyAsWords from './currencyAsWords'

test('utils-currency-as-words', () => {
  type IExample = {
    number: number
    string: string
  }

  const examples: IExample[] = [
    { number: 1000.09, string: 'jeden tysiąc złotych 09/100' },
    {
      number: 10123.1,
      string: 'dziesięć tysięcy sto dwadzieścia trzy złote 10/100',
    },
    { number: 13.76, string: 'trzynaście złotych 76/100' },
    {
      number: 6581.24,
      string: 'sześć tysięcy pięćset osiemdziesiąt jeden złotych 24/100',
    },
    {
      number: 4.09,
      string: 'cztery złote 09/100',
    },
    {
      number: 1.31,
      string: 'jeden złoty 31/100',
    },
    {
      number: 0.73,
      string: 'zero złotych 73/100',
    },
    {
      number: 0,
      string: 'zero złotych 00/100',
    },
  ]

  _.forEach(examples, (example: IExample): void => {
    const expectedTranslation: string = example.string
    const translation: string = currencyAsWords(example.number)

    expect(translation).toStrictEqual(expectedTranslation)
  })
})
