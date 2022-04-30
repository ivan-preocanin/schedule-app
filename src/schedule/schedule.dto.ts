import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export interface ScheduleDto {
  id: string;
  accountId: number;
  agentId: number;
  startTime: Date;
  endTime: Date;
}

export class FindOneScheduleDto implements Pick<ScheduleDto, 'id'> {
  @IsUUID('4')
  id: string;
}

export class DeleteScheduleDto implements Pick<ScheduleDto, 'id'> {
  @IsUUID('4')
  id: string;
}

export class CreateScheduleDto implements Omit<ScheduleDto, 'id'> {
  @IsNumber()
  accountId: number;

  @IsNumber()
  agentId: number;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;
}
