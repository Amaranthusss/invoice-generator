import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface IStates {
  pdfDoc: string
}

const states = {
  pdfDoc: '',
}

const globalSlice = createSlice({
  name: 'global',
  initialState: states,
  reducers: {
    setPdfDoc: (state: IStates, action: PayloadAction<string>): void => {
      state.pdfDoc = action.payload
    },
  },
})

export const getPdfDoc = (state: RootState): string => {
  return state.globalSlice.pdfDoc
}

export const { setPdfDoc } = globalSlice.actions

export default globalSlice.reducer
