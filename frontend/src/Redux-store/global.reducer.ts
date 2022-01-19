import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataChange } from 'devextreme/ui/data_grid'
import { RootState } from './store'
import _ from 'lodash'

import {
  getBruttoFromNetto,
  getVatFromNetto,
} from '../utils/currencyCalculations'

import { IAppSize, IServices, IStates } from './global.reducer.interface'
import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'
import { ICreateFileDto } from '../../../backend/src/invoices/dtos/createFile.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'

import { Enums } from '../constants/enums'

const states: IStates = {
  clientFirm: null,
  services: {},
  appSize: { width: undefined, height: undefined },
  configurator: null,
  invoiceDoc: {} as any,
}

const globalSlice = createSlice({
  name: 'global',
  initialState: states,
  reducers: {
    setClientFirm: (
      state: IStates,
      action: PayloadAction<IClientsListClientFirmData>
    ): void => {
      state.clientFirm = action.payload
    },
    updateService: (
      state: IStates,
      action: PayloadAction<
        DataChange<IServicesListServiceData, string | { __KEY__: string }>
      >
    ): void => {
      const key: string = _.isObject(action.payload.key)
        ? action.payload.key.__KEY__
        : action.payload.key

      switch (action.payload.type) {
        case 'update':
          const modifiedServices: IServices = _.cloneDeep(state.services)
          const brutto: number = getBruttoFromNetto(
            action.payload.data?.netto as number
          )

          const vat: number = getVatFromNetto(
            action.payload.data?.netto as number
          )

          const netto: number = _.toNumber(action.payload.data?.netto as number)

          const newData: IServicesListServiceData = {
            name: action.payload.data?.name as string,
            netto: netto,
            brutto: brutto,
            key: key,
            vat: vat,
            vatAsPercents: Enums.VatAsPercents,
          }
          modifiedServices[key] = newData
          state.services = modifiedServices

          break

        case 'remove':
          state.services = _.omit(_.cloneDeep(state.services), [key])

          break

        default:
          break
      }
    },
    setAppSize: (state: IStates, action: PayloadAction<IAppSize>): void => {
      state.appSize = action.payload
    },
    setConfigurator: (
      state: IStates,
      action: PayloadAction<IConfigurator>
    ): void => {
      state.configurator = action.payload
    },
    setInvoiceDoc: (
      state: IStates,
      action: PayloadAction<ICreateFileDto>
    ): void => {
      state.invoiceDoc = action.payload
    },
  },
})

export const getClientFirm = (
  state: RootState
): IClientsListClientFirmData | null => {
  return state.globalSlice.clientFirm
}

export const getServices = (state: RootState): IServices => {
  return state.globalSlice.services
}

export const getAppSize = (state: RootState): IAppSize => {
  return state.globalSlice.appSize
}

export const getConfigurator = (state: RootState): IConfigurator | null => {
  return state.globalSlice.configurator
}

export const getInvoiceDoc = (state: RootState): ICreateFileDto => {
  return state.globalSlice.invoiceDoc
}

export const {
  setClientFirm,
  updateService,
  setAppSize,
  setConfigurator,
  setInvoiceDoc,
} = globalSlice.actions

export default globalSlice.reducer
