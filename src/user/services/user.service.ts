import { Injectable, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Iuser } from '../interfaces/user.interface';
const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
/**
 * Función encargada de guardar un usuario
 * 
 * @param user Objeto de tipo usuario.
 */
  async save(user: Iuser) {
    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
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
