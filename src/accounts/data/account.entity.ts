import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  accountNumber: string;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  balance: number;
}
