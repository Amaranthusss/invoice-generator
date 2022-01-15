import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'

export interface IServices {
  [__KEY__: string]: IServicesListServiceData
}

export interface IAppSize {
  width: number | undefined
  height: number | undefined
}

export interface IStates {
  clientFirm: IClientsListClientFirmData | null
  services: IServices
  appSize: IAppSize
}
