
import { Ischedule } from '../interfaces/schedule.interface';
import { eTypesSchedule } from '../enums/type.enum';
import { Injectable, Get, NotFoundException, UnauthorizedException, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from '../schema/schedule.schema';
import { ObjectID } from 'mongodb';
const ObjectId = require('mongodb').ObjectId;
let moment = require('moment');

@Injectable()
export class ScheduleService {

    constructor(
        @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
    ) { }
    async save(scheduless: Ischedule): Promise<any> {
        try {
            let scheduletosave: Ischedule = {
                name: scheduless.name,
                start: scheduless.start,
                finish: scheduless.finish,
                type: scheduless.type,
                url: scheduless.url,
                fecha_visualizacion: scheduless.fecha_visualizacion
            }
            const createdSchedule = new this.scheduleModel(scheduletosave);
            return await createdSchedule.save();
        } catch (error) {
            console.log('errr', error)
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }



    async getSchedule(type: string): Promise<any> {
       /* 
        */ }

}
