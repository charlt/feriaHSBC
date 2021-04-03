import { ScheduleService } from './services/schedule.service';
import { ScheduleController } from './schedule.controller';
import { Module } from '@nestjs/common';
import { Schedule, ScheduleSchema } from './schema/schedule.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Schedule.name, schema: ScheduleSchema }]),
    ],
    controllers: [
        ScheduleController,
    ],
    providers: [
        ScheduleService,
    ],
})
export class ScheduleModule { }
