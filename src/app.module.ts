import { ScheduleModule } from './schedule/schedule.module';
import { ScheduleController } from './schedule/schedule.controller';
import { StatisticModule } from './statistics/statistic.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  //TODO: Variable de entorno db
  imports: [
    ScheduleModule,
    StatisticModule,
    MongooseModule.forRoot('mongodb://localhost:27017/hsbcFeria', {
      useNewUrlParser: true
    }),
    UserModule,
    ContactsModule
  ],
  controllers: [
     AppController],
  providers: [AppService, UserModule],
})
export class AppModule { }
