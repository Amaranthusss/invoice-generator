export const firmData: IFirmData = {
  name: { value: 'Usługi Elektryczno – Budowlane „TAGRA” Tadeusz Szkurłat' },
  address: { value: 'pl. Wolskiego 4/13, 41-902 Bytom' },
  phone: { value: 697250666, caption: 'Tel.:' },
  nip: { value: 6261011402, caption: 'NIP:' },
  bankAcount: { value: 26102023680000250205312246 },
  bankName: { value: 'Powszechna Kasa Oszczędności Bank Polski SA' },
}

type IFirmData = {
  [key: string]: IFirmDataParameter
}

export type IFirmDataParameter = {
  caption?: string
  value: number | string
}
