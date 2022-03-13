import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FirmData {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  subname: string
  @Column()
  address: string
  @Column()
  city: string
  @Column()
  phone: string
  @Column()
  nip: number
  @Column()
  bankAcount: string
  @Column()
  bankName: string
}
