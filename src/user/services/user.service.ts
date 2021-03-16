import { Injectable, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Iuser } from '../interfaces/user.interface';
const ObjectId = require('mongodb').ObjectId;
import {  StatisticService} from '../../statistics/services/statistic.service';
import { eTypeStatistics } from '../../statistics/enums/type.enum';

import { Istatistic } from '../../statistics/interfaces/statistic.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly statisticService: StatisticService) { }
/**
 * Función encargada de guardar un usuario
 * 
 * @param user Objeto de tipo usuario.
 */
  async save(user: Iuser) {
    try {
      const createdUser = new this.userModel(user);
      let userSaved= await createdUser.save();
      let statistic:Istatistic={
        type:eTypeStatistics.registro,
        userId:userSaved._id
      }
      await this.statisticService.save(statistic);
      return userSaved;
    } catch (error) {
      let message = error._message ?? error.toString()
      return { error: message }
    }
  }

  /**
   * Función encargada de extraer a todos los usuarios
   */
  async getUsers(): Promise<UserDocument[]> {
    try {
      const users: Array<any> = await this.userModel.find();
      return users;
    } catch (error) {
     throw new Error("Internal server error");
    }
  }

  /**
   * Función encargada de extraer los datos de un usuario
   * 
   * @param userId Identificador de usuario
   */
  async getUser(userId:string){
    try {
      const user: any = await this.userModel.findById(ObjectId(userId));
      return user;
    } catch (error) {
        return{
          error:error.toString()
        }
    }
  }

}
