
import { Ischedule } from '../interfaces/schedule.interface';
import { eTypesSchedule } from '../enums/type.enum';
import { Injectable, Get, NotFoundException, UnauthorizedException, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule, ScheduleDocument } from '../schema/schedule.schema';
const ObjectId = require('mongodb').ObjectId;

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


    async getSchedule(tipo: eTypesSchedule): Promise<any> {
        try {
            let query: any[];
            let res: any = '';
            let fechas: string[] = [];
            let resultado: any[] = [];
            query = [{ $match: { type: tipo } }, { $group: { _id: "$fecha_visualizacion" } }, { $sort: { start: 1 } }];
            res = await this.scheduleModel.aggregate(query);
            fechas = res;
            for (const i of fechas) {
                let fecha: any = Object.values(i);
                query = [{ $match: { fecha_visualizacion: new Date(fecha), type: tipo, status: 'true' } }, { $sort: { start: 1 } }];
                res = await this.scheduleModel.aggregate(query);
                let objeto: any = { fecha: Object.values(i), res }
                resultado.push(objeto);
            }
            return resultado;
        }
        catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }

}
