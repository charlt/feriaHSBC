import { Injectable } from '@nestjs/common';
import {  Model } from 'mongoose';
import { Iquestions } from '../interfaces/questions.interface';
import { Questions,QuestionsDocument } from '../schema/questions.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
const ObjectId = require('mongodb').ObjectId;
@Injectable()
export class QuestionsService { 
    constructor(
        @InjectModel(Questions.name) private questionsModel: Model<QuestionsDocument>,
    private readonly _jwtService: JwtService,) { }

    async save( Questions: any): Promise<any> {
        console.log('Questions.token :>> ', Questions);
        const dataUser:any = await this._jwtService.decode(Questions.token);
        try {
            let questionsToSave:Iquestions={
                question:Questions.question,
                userId:ObjectId(dataUser.userId),
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
