import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { StatisticService } from '../statistics/services/statistic.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic,StatisticSchema} from '../statistics/schema/statistic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Statistic.name, schema: StatisticSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,StatisticService]
})
export class UserModule { }
