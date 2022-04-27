import { Controller } from '@nestjs/common';
import { ApiEndpoint } from 'src/util';
import { TaskService } from './task.service';

@Controller(ApiEndpoint.TASK.BASE)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
