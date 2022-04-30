import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(createTaskDto);
  }
}
