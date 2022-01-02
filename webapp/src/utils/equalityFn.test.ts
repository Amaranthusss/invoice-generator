import { equalityFn } from './equalityFn'
import _ from 'lodash'

test('equalityFn-update-boolean-value', () => {
  const prevValue: boolean = false
  const nextValue: boolean = true
  let output: boolean = prevValue

  const updateValue = (updatedValue: boolean) => {
    output = updatedValue
  }
  equalityFn(prevValue, nextValue, updateValue)

  expect(output).toEqual(nextValue)
})

test('equalityFn-update-object-value', () => {
  type IInputObject = { a: number; b: string }
	
  const prevValue: IInputObject = { a: 1, b: '123' }
  const nextValue: IInputObject = { a: 1, b: '153' }

  let output: IInputObject = _.cloneDeep(prevValue)

  const updateValue = (updatedValue: IInputObject) => {
    output = updatedValue
  }

  equalityFn(prevValue, nextValue, updateValue)

  expect(output).toEqual(nextValue)
})
