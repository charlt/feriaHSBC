import { QuestionsModule } from './questions/questions.module';
import { ScheduleModule } from './schedule/schedule.module';
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
    QuestionsModule,
    ScheduleModule,
    StatisticModule,
    MongooseModule.forRoot('mongodb://superAdminDev:Pass1234@173.231.203.133:27017/hsbcFeria', {
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
