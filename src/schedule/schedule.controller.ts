import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiEndpoint } from '../util';
import { CreateScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller(ApiEndpoint.SCHEDULE.BASE)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(ApiEndpoint.SCHEDULE.FIND_ALL)
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(ApiEndpoint.SCHEDULE.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Schedule> {
    return this.scheduleService.findOne(id);
  }

  @Post(ApiEndpoint.SCHEDULE.CREATE)
  create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Delete(ApiEndpoint.SCHEDULE.DELETE)
  delete(@Query('id') id: string): Promise<void> {
    return this.scheduleService.delete(id);
  }
}
