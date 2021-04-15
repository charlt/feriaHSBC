import { QuestionsService } from './services/questions.service';
import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { Questions, QuestionsSchema } from './schema/questions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../user/estrategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: Questions.name, schema: QuestionsSchema }]),
        PassportModule.register({
            defaultStrategy: 'jwt',
          }),
          JwtModule.register({
            secret: 'HSBCSecret',
            signOptions: { expiresIn: 7200 },
          }),
    ],
    controllers: [
        QuestionsController,],
    providers: [
        QuestionsService,],
})
export class QuestionsModule { }
