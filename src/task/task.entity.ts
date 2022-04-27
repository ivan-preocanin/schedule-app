import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  type: string;
}
