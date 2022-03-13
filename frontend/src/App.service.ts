import { IFirmDataDto } from '../../backend/src/firm-data/dtos/save.interface'
import { IFirmData } from './Redux-store/global.reducer.interface'

const transformFirmDataDtoToFirmDataObject = (
  firmDataDto: IFirmDataDto
): IFirmData => {
  return {
    name: { value: firmDataDto.name },
    subname: { value: firmDataDto.subname },
    address: { value: firmDataDto.address },
    city: { value: firmDataDto.city },
    phone: { value: firmDataDto.phone, caption: 'Tel.:' },
    nip: { value: firmDataDto.nip, caption: 'NIP:' },
    bankAcount: { value: firmDataDto.bankAcount },
    bankName: { value: firmDataDto.bankName },
  }
}

const tranformFirmDataObjectToFrimDataDto = (
  firmData: IFirmData
): IFirmDataDto => {
  return {
    address: firmData.address.value as string,
    bankAcount: firmData.bankAcount.value as string,
    bankName: firmData.bankName.value as string,
    city: firmData.city.value as string,
    name: firmData.name.value as string,
    nip: firmData.nip.value as number,
    phone: firmData.phone.value as string,
    subname: firmData.subname.value as string,
  }
}

const service = {
  transformFirmDataDtoToFirmDataObject,
  tranformFirmDataObjectToFrimDataDto,
}

export default service
