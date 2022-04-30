import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({ relations: { tasks: true } });
  }

  findOne(id: string): Promise<Schedule> {
    return this.scheduleRepository.findOne({
      where: { id: id },
      relations: { tasks: true },
    });
  }

  async delete(id: string): Promise<void> {
    await this.scheduleRepository.delete(id);
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return await this.scheduleRepository.save(createScheduleDto);
  }
}
