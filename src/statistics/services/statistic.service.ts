import { Injectable, Get } from '@nestjs/common';
import { Aggregate, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Statistic, StatisticDocument } from '../schema/statistic.schema';
import { Istatistic } from '../interfaces/statistic.interface';
import { Db } from 'mongodb';
import { eTypeStatistics, eTypeGenders, eTypeTemporalities } from '../enums/type.enum';
import { JwtService } from '@nestjs/jwt';
import { count } from 'console';
const ObjectId = require('mongodb').ObjectId;
let moment = require('moment');
@Injectable()
export class StatisticService {
    constructor(
        @InjectModel(Statistic.name) private statisticModel: Model<StatisticDocument>,
        private readonly _jwtService: JwtService,
        ) { }
    
    async save(userId:string, statistic: any): Promise<any> {
        try {
            let statisticToSave:Istatistic={
                type:statistic.type,
                userId:ObjectId(userId)
            }
            const createdstatistic = new this.statisticModel(statisticToSave);
            return await createdstatistic.save();
        } catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }
    
    async save2( statistic: any): Promise<any> {
        console.log(statistic);
        const dataUser:any = await this._jwtService.decode(statistic.token);
        delete statistic.token;
        // console.log(statistic);
        try {
            let statisticToSave:Istatistic={
                userId:ObjectId(dataUser.userId),
                // type:statistic.type,
                ...statistic
            }
            
            const createdstatistic = new this.statisticModel(statisticToSave);
            const r = await createdstatistic.save();
            console.log(r);
            return r;
        } catch (error) {
            let message = error._message ?? error.toString()
            console.log(error);
            return { error: message }
        }
    }


    async update(statisticObject: any): Promise<any> {
        try {
            let statistic: any = await this.statisticModel.findOne({ "_id": ObjectId(statisticObject.statisticId) });
            let fecha1: Date = moment(statistic.createdAt);
            if (statistic) {
                statistic.finishedAt = Date.now();
                let fecha2: any = moment(statistic.finishedAt);
                statistic.minutes = fecha2.diff(fecha1, 'minutes');
                return await this.statisticModel.findOneAndUpdate({ "_id": statisticObject.statisticId }, {
                    finishedAt: statistic.finishedAt,
                    minutes: statistic.minutes
                });
            } else {
                return { error: 'Resource not found' };
            }
        } catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }


    async getStatistics(type: string, temporality: string): Promise<any> {
        try {
            let query: any[];
            let countg: any;
            let resultado: any[] = [];
            switch (type) {
                case eTypeStatistics.loginByGender:
                    if (temporality == eTypeTemporalities.all) {
                        for (const i of Object.values(eTypeGenders)) {
                            query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login', 'users.gender': i } }];
                            countg = await this.statisticModel.aggregate(query);
                            let objeto: any = { type: i, count: countg.length }
                            resultado.push(objeto);
                        }
                    }
                    if (temporality == eTypeTemporalities.day) {
                        for (const i of Object.values(eTypeGenders)) {
                            query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login', 'users.gender': i } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                            countg = await this.statisticModel.aggregate(query);
                            let objeto: any = { type: i, countg }
                            resultado.push(objeto);
                        }
                    }
                    return resultado;
                case eTypeStatistics.login:
                    if (temporality == eTypeTemporalities.all) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login' } }];
                        countg = await this.statisticModel.aggregate(query);
                        console.log(countg);
                        let objeto: any = { LoginsTotales: countg.length }
                        resultado.push(objeto);
                    }
                    if (temporality == eTypeTemporalities.day) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login' } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { LoginsPorDia: countg }
                        resultado.push(objeto);
                    }
                    return resultado;
                case eTypeStatistics.statisticsLogin:
                    if (temporality == eTypeTemporalities.all) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login' } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { LoginsTotales: countg.length }
                        resultado.push(objeto);
                    }
                    if (temporality == eTypeTemporalities.day) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Login' } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { LoginsPorDia: countg }
                        resultado.push(objeto);
                    }
                    return resultado;
                case eTypeStatistics.statisticsRegistro:
                    if (temporality == eTypeTemporalities.all) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Registro' } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosTotales: countg.length }
                        resultado.push(objeto);
                    }
                    if (temporality == eTypeTemporalities.day) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'Registro' } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosPorDia: countg }
                        resultado.push(objeto);
                    }
                    return resultado;
                case eTypeStatistics.entrarSchundle:
                    if (temporality == eTypeTemporalities.all) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'entrarSchundle' } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosTotales: countg.length }
                        resultado.push(objeto);
                    }
                    if (temporality == eTypeTemporalities.day) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'entrarSchundle' } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosPorDia: countg }
                        resultado.push(objeto);
                    }
                    return resultado;
                case eTypeStatistics.entrarAgenda:
                    if (temporality == eTypeTemporalities.all) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'entrarAgenda' } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosTotales: countg.length ,Registros: countg }
                        resultado.push(objeto);
                    }
                    if (temporality == eTypeTemporalities.day) {
                        query = [{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'users' } }, { $match: { type: 'entrarAgenda' } }, { $group: { _id: { $dayOfMonth: "$createdAt" }, count: { $sum: 1 } } }];
                        countg = await this.statisticModel.aggregate(query);
                        let objeto: any = { RegistrosPorDia: countg }
                        resultado.push(objeto);
                    }
                    return resultado;
                default:
                    return { error: 'Resource not found' };
                    break;
            }
        }
        catch (error) {
            let message = error._message ?? error.toString()
            return { error: message }
        }
    }
}
