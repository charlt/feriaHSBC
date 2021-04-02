import { StatisticService } from './services/statistic.service';
import { StatisticController } from './statistic.controller';
import { Module } from '@nestjs/common';
import { Statistic,StatisticSchema} from './schema/statistic.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Statistic.name, schema: StatisticSchema }]),
    ],
    controllers: [
        StatisticController,],
    providers: [
        StatisticService,],
})
export class StatisticModule { }
