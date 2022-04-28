import { Task } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: number;

  @Column()
  agentId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @OneToMany(() => Task, (task) => task.schedule, {
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
