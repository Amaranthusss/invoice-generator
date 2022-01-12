import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  key: string
  @Column()
  name: string
  @Column()
  address: string
  @Column()
  city: string
  @Column()
  nip: number
}
