import { Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('/schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
}
