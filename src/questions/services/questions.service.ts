import { Injectable } from '@nestjs/common';
import {  Model } from 'mongoose';
import { Iquestions } from '../interfaces/questions.interface';
import { Questions,QuestionsDocument } from '../schema/questions.schema';
import { InjectModel } from '@nestjs/mongoose';
const ObjectId = require('mongodb').ObjectId;
@Injectable()
export class QuestionsService { 
    constructor(@InjectModel(Questions.name) private questionsModel: Model<QuestionsDocument>) { }

    async save(userId:string, Questions: any): Promise<any> {
        try {
            let questionsToSave:Iquestions={
                question:Questions.question,
                userId:ObjectId(userId),
                cluster:Questions.cluster
            }
            const createdquestions = new this.questionsModel(questionsToSave);
            return await createdquestions.save();
        } catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
       }

}
