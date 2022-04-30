import { IsDateString, IsNumber } from 'class-validator';

export interface ScheduleDto {
  id: string;
  accountId: number;
  agentId: number;
  startTime: Date;
  endTime: Date;
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
