import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskType {
  Work = 'work',
  Break = 'break',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  account_id: number;

  @Column()
  schedule_id: string;

  @Column()
  start_time: Date;

  @Column()
  duration: number;

  @Column({ enum: [TaskType.Work, TaskType.Break] })
  type: string;
}
