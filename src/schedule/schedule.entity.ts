import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
