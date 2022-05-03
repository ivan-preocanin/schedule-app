import { ApiProperty } from '@nestjs/swagger';
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

export class FindOneTaskDto implements Pick<TaskDto, 'id'> {
  @ApiProperty()
  @IsUUID('4')
  id: string;
}

export class DeleteTaskDto implements Pick<TaskDto, 'id'> {
  @ApiProperty()
  @IsUUID('4')
  id: string;
}

export class CreateTaskDto implements Omit<TaskDto, 'id'> {
  @ApiProperty()
  @IsNumber()
  accountId: number;

  @ApiProperty()
  @IsUUID('4')
  scheduleId: string;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({ enum: TaskType })
  @IsEnum(TaskType)
  type: TaskType;
}
