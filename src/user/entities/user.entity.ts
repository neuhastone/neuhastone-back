import { Base } from 'src/common/entities/base.entity';
import { Project } from 'src/project/entities/project.entity';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';

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

  @ManyToMany(() => Project, (project) => project.projectMembers)
  belongProjects: Project[];

  @OneToMany(() => Project, (project) => project.creator)
  projects: Project[];
}
