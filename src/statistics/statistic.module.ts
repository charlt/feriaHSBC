import { StatisticService } from './services/statistic.service';
import { StatisticController } from './statistic.controller';
import { Module } from '@nestjs/common';
import { Statistic,StatisticSchema} from './schema/statistic.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Statistic.name, schema: StatisticSchema }]),
        PassportModule.register({
            defaultStrategy: 'jwt',
          }),
          JwtModule.register({
            secret: 'HSBCSecret',
            signOptions: { expiresIn: 7200 },
          }),
    ],
    controllers: [
        StatisticController,],
    providers: [
        StatisticService,],
})
export class StatisticModule { }
