import { IsDateString, IsEnum, IsNumber, IsUUID, Min } from 'class-validator';
import { TaskType } from '../task/task.entity';

export interface TaskDto {
  id: string;
  accountId: number;
  scheduleId: string;
  startTime: Date;
  duration: number;
  type: TaskType;
}

export class CreateTaskDto implements Omit<TaskDto, 'id'> {
  @IsNumber()
  accountId: number;

  @IsUUID('4')
  scheduleId: string;

  @IsDateString()
  startTime: Date;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsEnum(TaskType)
  type: TaskType;
}
