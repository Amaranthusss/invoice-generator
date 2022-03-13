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

const service = { transformFirmDataDtoToFirmDataObject }

export default service
