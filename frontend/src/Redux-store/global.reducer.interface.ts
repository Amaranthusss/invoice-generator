import { IClientsListClientFirmData } from '../components/MainModule/ClientsList/ClientsList.interface'
import { ICreateFileDto } from '../../../backend/src/invoices/dtos/createFile.interface'
import { IConfigurator } from '../components/MainModule/Configurator/Configurator.interface'
import { IServicesListServiceData } from '../components/MainModule/ServicesList/ServicesList.interface'

export interface IServices {
  [__KEY__: string]: IServicesListServiceData
}

export type IFirmDataParameter = {
  caption?: string
  value: number | string
}

export interface IFirmData {
  name: IFirmDataParameter
  subname: IFirmDataParameter
  address: IFirmDataParameter
  city: IFirmDataParameter
  phone: IFirmDataParameter
  nip: IFirmDataParameter
  bankAcount: IFirmDataParameter
  bankName: IFirmDataParameter
}

export interface IAppSize {
  width: number | undefined
  height: number | undefined
}

export interface IStates {
  clientFirm: IClientsListClientFirmData | null
  firmData: IFirmData | null
  services: IServices
  appSize: IAppSize
  configurator: IConfigurator | null
  invoiceDoc: ICreateFileDto
}
