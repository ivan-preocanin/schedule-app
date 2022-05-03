import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TaskController } from './task.controller';
import { CreateTaskDto } from './task.dto';
import { Task, TaskType } from './task.entity';
import { TaskService } from './task.service';

describe('Task', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  let taskRepository: Repository<Task>;

  let tasks: Task[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            findOneBy: jest.fn((filter: { id: string }) =>
              tasks.find((task: Task) => task.id === filter.id),
            ),
            delete: jest.fn((id: string) => {
              tasks = tasks.filter((task: Task) => task.id !== id);
            }),
            save: jest.fn((task: Task): Task => {
              const newTask = { id: uuid(), ...task };
              tasks = [...tasks, newTask];
              return newTask;
            }),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    tasks = [
      {
        accountId: 1,
        scheduleId: 'be55c9ca-476d-40f9-84bf-f3e7a3454d4a',
        startTime: new Date('2022-01-01'),
        duration: 3600000,
        type: 'work',
        id: '37622840-f119-4c78-badb-903fee1dd2f9',
        schedule: {
          id: 'be55c9ca-476d-40f9-84bf-f3e7a3454d4a',
          accountId: 1,
          agentId: 1,
          startTime: new Date('2022-01-01T00:00:00.000Z'),
          endTime: new Date('2022-01-31T00:00:00.000Z'),
          tasks: [],
        },
      },
    ];
  });

  it('should have TaskController defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should have TaskService defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should have TaskRepository defined', () => {
    expect(taskRepository).toBeDefined();
  });

  it('should find a single task', async () => {
    jest.spyOn(taskService, 'findOne');
    await taskController.findOne({ id: tasks[0].id });
    expect(taskService.findOne).toHaveBeenCalledWith(tasks[0].id);
  });

  it('should delete a task', async () => {
    jest.spyOn(taskService, 'delete');
    const taskId = tasks[0].id;
    await taskController.delete({ id: taskId });
    expect(taskService.delete).toHaveBeenCalledWith(taskId);
    expect(tasks.find((task: Task) => task.id === taskId)).toBeUndefined();
  });

  it('should create a task', async () => {
    jest.spyOn(taskService, 'create');
    const createTaskDto: CreateTaskDto = {
      accountId: 4,
      scheduleId: 'be55c9ca-476d-40f9-84bf-f3e7a3454d4a',
      duration: 3600000,
      type: TaskType.Work,
      startTime: new Date('2022-04-01'),
    };
    const newTask: Task = await taskController.create(createTaskDto);
    expect(taskService.create).toHaveBeenCalledWith(createTaskDto);
    expect(tasks.find((task: Task) => task.id === newTask.id)).toEqual(newTask);
  });
});
