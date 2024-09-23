import { Base } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Project extends Base {
  constructor(project?: Partial<Project>) {
    super();
    if (project) {
      Object.assign(this, project);
    }
  }

  @Column()
  title: string;

  @Column()
  productDescription: string;

  @Column({
    nullable: true,
  })
  budget: number;

  @Column({
    nullable: true,
  })
  startDate: Date;

  @Column({
    nullable: true,
  })
  endDate: Date;

  @ManyToMany(() => User, (user) => user.belongProjects)
  @JoinTable({
    name: 'project_members',
  })
  projectMembers: User[];

  @ManyToOne(() => User, (user) => user.projects)
  creator: User;
}
