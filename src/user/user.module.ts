import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { StatisticService } from '../statistics/services/statistic.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from '../statistics/schema/statistic.schema';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Statistic.name, schema: StatisticSchema }]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'HSBCSecret',
      signOptions: { expiresIn: 7200 },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, StatisticService,JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class UserModule { }
