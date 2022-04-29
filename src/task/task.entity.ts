import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from '../schedule/schedule.entity';

export enum TaskType {
  Work = 'work',
  Break = 'break',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: number;

  @Column()
  scheduleId: string;

  @Column()
  startTime: Date;

  @Column()
  duration: number;

  @Column({ enum: [TaskType.Work, TaskType.Break] })
  type: string;

  @ManyToOne(() => Schedule, (schedule) => schedule.tasks, {
    onDelete: 'CASCADE',
  })
  schedule: Schedule;
}
