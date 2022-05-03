import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ScheduleController } from './schedule.controller';
import { CreateScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.entity';
import { ScheduleService } from './schedule.service';

describe('Schedule', () => {
  let scheduleController: ScheduleController;
  let scheduleService: ScheduleService;
  let scheduleRepository: Repository<Schedule>;

  let schedules: Schedule[];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useValue: {
            find: jest.fn(() => schedules),
            findOne: jest.fn((id: string) =>
              schedules.find((schedule: Schedule) => schedule.id === id),
            ),
            delete: jest.fn((id: string) => {
              schedules = schedules.filter(
                (schedule: Schedule) => schedule.id !== id,
              );
            }),
            save: jest.fn((schedule: Schedule): Schedule => {
              const newSchedule = { id: uuid(), ...schedule, tasks: [] };
              schedules = [...schedules, newSchedule];
              return newSchedule;
            }),
          },
        },
      ],
    }).compile();

    scheduleController = module.get<ScheduleController>(ScheduleController);
    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleRepository = module.get<Repository<Schedule>>(
      getRepositoryToken(Schedule),
    );
    schedules = [
      {
        id: 'be55c9ca-476d-40f9-84bf-f3e7a3454d4a',
        accountId: 1,
        agentId: 1,
        startTime: new Date('2022-01-01T00:00:00.000Z'),
        endTime: new Date('2022-01-31T00:00:00.000Z'),
        tasks: [],
      },
      {
        id: '1d2fa918-83f5-4cf0-b13e-a11b528b8f30',
        accountId: 2,
        agentId: 2,
        startTime: new Date('2022-02-01T00:00:00.000Z'),
        endTime: new Date('2022-02-28T00:00:00.000Z'),
        tasks: [],
      },
      {
        id: '6fd994cd-7775-4009-8cc6-e07d70f32ea8',
        accountId: 3,
        agentId: 3,
        startTime: new Date('2022-03-01T00:00:00.000Z'),
        endTime: new Date('2022-03-31T00:00:00.000Z'),
        tasks: [],
      },
    ];
  });

  it('should have ScheduleController defined', () => {
    expect(scheduleController).toBeDefined();
  });

  it('should have ScheduleService defined', () => {
    expect(scheduleService).toBeDefined();
  });

  it('should have ScheduleRepository defined', () => {
    expect(scheduleRepository).toBeDefined();
  });

  it('should find a single schedule', async () => {
    jest.spyOn(scheduleService, 'findOne');
    await scheduleController.findOne({ id: schedules[0].id });
    expect(scheduleService.findOne).toHaveBeenCalledWith(schedules[0].id);
  });

  it('should find all schedules', async () => {
    jest.spyOn(scheduleService, 'findAll');
    await scheduleController.findAll();
    expect(scheduleService.findAll).toHaveBeenCalled();
  });

  it('should delete a schedule', async () => {
    jest.spyOn(scheduleService, 'delete');
    const scheduleId = schedules[2].id;
    await scheduleController.delete({ id: scheduleId });
    expect(scheduleService.delete).toHaveBeenCalledWith(scheduleId);
    expect(
      schedules.find((schedule: Schedule) => schedule.id === scheduleId),
    ).toBeUndefined();
  });

  it('should create a schedule', async () => {
    jest.spyOn(scheduleService, 'create');
    const createScheduleDto: CreateScheduleDto = {
      accountId: 4,
      agentId: 4,
      startTime: new Date('2022-04-01'),
      endTime: new Date('2022-04-30'),
    };
    const newSchedule: Schedule = await scheduleController.create(
      createScheduleDto,
    );
    expect(scheduleService.create).toHaveBeenCalledWith(createScheduleDto);
    expect(
      schedules.find((schedule: Schedule) => schedule.id === newSchedule.id),
    ).toEqual(newSchedule);
  });
});
