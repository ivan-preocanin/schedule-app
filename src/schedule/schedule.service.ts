import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  findOne(id: string): Promise<Schedule> {
    return this.scheduleRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  async create(schedule: Schedule): Promise<Schedule> {
    return await this.scheduleRepository.save(schedule);
  }
}
