import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  citizenId: string;

  @Column({ nullable: true })
  passportNumber: string;

  @Column({ nullable: true })
  proofOfIdentity: string;
}
