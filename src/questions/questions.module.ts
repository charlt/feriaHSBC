import { QuestionsService } from './services/questions.service';
import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { Questions, QuestionsSchema } from './schema/questions.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Questions.name, schema: QuestionsSchema }]),
    ],
    controllers: [
        QuestionsController,],
    providers: [
        QuestionsService,],
})
export class QuestionsModule { }
