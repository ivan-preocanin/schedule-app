import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiEndpoint } from '../util';
import { CreateTaskDto, DeleteTaskDto, FindOneTaskDto } from './task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller(ApiEndpoint.TASK.BASE)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(ApiEndpoint.TASK.FIND_ONE)
  findOne(@Query() findOneTaskDto: FindOneTaskDto): Promise<Task> {
    return this.taskService.findOne(findOneTaskDto.id);
  }

  @Post(ApiEndpoint.TASK.CREATE)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Delete(ApiEndpoint.TASK.DELETE)
  delete(@Query() deleteTaskDto: DeleteTaskDto): Promise<void> {
    return this.taskService.delete(deleteTaskDto.id);
  }
}
