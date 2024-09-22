import { Base } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

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
  budget: string;

  @Column({
    nullable: true,
  })
  startDate: Date;

  @Column({
    nullable: true,
  })
  endDate: Date;
}
