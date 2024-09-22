import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends Base {
  constructor(user?: Partial<User>) {
    super();
    if (user) {
      Object.assign(this, user);
    }
  }

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
