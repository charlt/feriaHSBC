import { Injectable, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Statistic, StatisticDocument } from '../schema/statistic.schema';
import { Istatistic } from '../interfaces/statistic.interface';
const ObjectId = require('mongodb').ObjectId;
let moment= require('moment');
@Injectable()
export class StatisticService {

    constructor(@InjectModel(Statistic.name) private statisticModel: Model<StatisticDocument>) { }

    async save(statistic: Istatistic): Promise<any> {
        try {
            statistic.userId = ObjectId(statistic.userId);
            const createdstatistic = new this.statisticModel(statistic);
            return await createdstatistic.save();
        } catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }


    async update(statisticObject: any): Promise<any> {
        try {
            let statistic: any = await this.statisticModel.findOne({ "_id": ObjectId(statisticObject.statisticId) });
            let fecha1:Date=moment(statistic.createdAt);
            if (statistic) {
                statistic.finishedAt = Date.now();
                let fecha2:any=moment(statistic.finishedAt);
                statistic.minutes=fecha2.diff(fecha1, 'minutes');
                return await this.statisticModel.findOneAndUpdate({ "_id": statisticObject.statisticId },{
                    finishedAt:statistic.finishedAt,
                    minutes:statistic.minutes
                });
            } else {
                return { error: 'Resource not found' };
            }
        } catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }


}
