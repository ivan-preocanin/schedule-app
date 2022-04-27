import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findByScheduleId(scheduleId: string): Promise<Task[]> {
    return this.taskRepository.findBy({ schedule_id: scheduleId });
  }

  findOne(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }
}
