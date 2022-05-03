import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export interface ScheduleDto {
  id: string;
  accountId: number;
  agentId: number;
  startTime: Date;
  endTime: Date;
}

export class FindOneScheduleDto implements Pick<ScheduleDto, 'id'> {
  @ApiProperty()
  @IsUUID('4')
  id: string;
}

export class DeleteScheduleDto implements Pick<ScheduleDto, 'id'> {
  @ApiProperty()
  @IsUUID('4')
  id: string;
}

export class CreateScheduleDto implements Omit<ScheduleDto, 'id'> {
  @ApiProperty()
  @IsNumber()
  accountId: number;

  @ApiProperty()
  @IsNumber()
  agentId: number;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;
}
