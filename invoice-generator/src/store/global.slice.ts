import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataChange } from 'devextreme/ui/data_grid'
import { RootState } from './store'
import _ from 'lodash'

import { IClientsListClientFirmData } from '../components/Main/ClientsList/ClientsList.interface'
import { IServicesListServiceData } from '../components/Main/ServicesList/ServicesList.interface'

interface IServices {
  [__KEY__: string]: IServicesListServiceData
}

interface IStates {
  pdfDoc: string
  clientFirm: IClientsListClientFirmData | null
  services: IServices
}

const states = {
  pdfDoc: '',
  clientFirm: null,
  services: {},
}

const globalSlice = createSlice({
  name: 'global',
  initialState: states,
  reducers: {
    setPdfDoc: (state: IStates, action: PayloadAction<string>): void => {
      state.pdfDoc = action.payload
    },
    setClientFirm: (
      state: IStates,
      action: PayloadAction<IClientsListClientFirmData>
    ): void => {
      state.clientFirm = action.payload
    },
    updateService: (
      state: IStates,
      action: PayloadAction<DataChange<IServicesListServiceData, string>>
    ): void => {
      switch (action.payload.type) {
        case 'update':
          const modifiedServices: IServices = { ...state.services }

          modifiedServices[action.payload.key as string] = {
            ...action.payload.data,
          } as IServicesListServiceData
          state.services = modifiedServices

          break

        case 'remove':
          const clearedServices: IServices = { ...state.services }

          state.services = _.omit(clearedServices, [action.payload.key])

          break

        default:
          break
      }
    },
  },
})

export const getPdfDoc = (state: RootState): string => {
  return state.globalSlice.pdfDoc
}

export const getClientFirm = (
  state: RootState
): IClientsListClientFirmData | null => {
  return state.globalSlice.clientFirm
}

export const getServices = (state: RootState): IServices => {
  return state.globalSlice.services
}

export const { setPdfDoc, setClientFirm, updateService } = globalSlice.actions

export default globalSlice.reducer
