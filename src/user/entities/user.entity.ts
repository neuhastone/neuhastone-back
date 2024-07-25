import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  @Generated('uuid')
  uuid: string;
}
