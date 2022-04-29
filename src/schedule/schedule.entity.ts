import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';

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

  @OneToMany(() => Task, (task) => task.schedule)
  tasks: Task[];
}
