import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiEndpoint } from '../util';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller(ApiEndpoint.TASK.BASE)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(ApiEndpoint.TASK.FIND_ONE)
  findOne(@Query('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Get(ApiEndpoint.TASK.FIND_BY_SCHEDULE_ID)
  findByScheduleId(@Query('scheduleId') scheduleId: string): Promise<Task[]> {
    return this.taskService.findByScheduleId(scheduleId);
  }

  @Post(ApiEndpoint.TASK.CREATE)
  create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Delete(ApiEndpoint.TASK.DELETE)
  delete(@Query('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }
}
