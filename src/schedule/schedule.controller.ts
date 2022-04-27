import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiEndpoint } from '../util';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller(ApiEndpoint.SCHEDULE.BASE)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(ApiEndpoint.SCHEDULE.FIND_ALL)
  findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Post(ApiEndpoint.SCHEDULE.CREATE)
  create(@Body() schedule: Schedule): Promise<Schedule> {
    return this.scheduleService.create(schedule);
  }
}
