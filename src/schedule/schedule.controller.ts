import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from '../util';
import {
  CreateScheduleDto,
  DeleteScheduleDto,
  FindOneScheduleDto,
} from './schedule.dto';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller(ApiEndpoint.SCHEDULE.BASE)
@ApiTags('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(ApiEndpoint.SCHEDULE.FIND_ALL)
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(ApiEndpoint.SCHEDULE.FIND_ONE)
  findOne(@Query() findOneScheduleDto: FindOneScheduleDto): Promise<Schedule> {
    return this.scheduleService.findOne(findOneScheduleDto.id);
  }

  @Post(ApiEndpoint.SCHEDULE.CREATE)
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Delete(ApiEndpoint.SCHEDULE.DELETE)
  delete(@Query() deleteScheduleDto: DeleteScheduleDto): Promise<void> {
    return this.scheduleService.delete(deleteScheduleDto.id);
  }
}
