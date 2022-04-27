import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Schedule } from './schedule/schedule.entity';
import { ScheduleModule } from './schedule/schedule.module';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // entities: ['dist/**/*.entity{.ts,.js}'],
      entities: [Schedule, Task],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
