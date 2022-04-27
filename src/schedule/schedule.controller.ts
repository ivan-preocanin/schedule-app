import { Controller } from '@nestjs/common';
import { ApiEndpoint } from 'src/util';
import { ScheduleService } from './schedule.service';

@Controller(ApiEndpoint.SCHEDULE.BASE)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
}
