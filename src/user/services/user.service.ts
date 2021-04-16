import { Injectable, Get, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Iuser } from '../interfaces/user.interface';
const ObjectId = require('mongodb').ObjectId;
import { StatisticService } from '../../statistics/services/statistic.service';
import { eTypeStatistics } from '../../statistics/enums/type.enum';
import { hash, genSalt } from 'bcryptjs';
import { Istatistic } from '../../statistics/interfaces/statistic.interface';
import { Login } from '../dto/login.dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

const fs = require('fs'); // filesystem
const csv = require('csv-parse');// Encargado de parsear


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly statisticService: StatisticService,
    private readonly _jwtService: JwtService,) { }
  /**
   * Función encargada de guardar un usuario
   * 
   * @param user Objeto de tipo usuario.
   */
  async save(user: Iuser) {
    try {
      console.log('user', user)
      const salt = await genSalt(10);
      //let password: any = await hash(user.password, salt);
      //user.password = password;
      const createdUser = new this.userModel(user);
      let userSaved = await createdUser.save();
      let statistic: Istatistic = {
        type: eTypeStatistics.registro,
        userId: userSaved._id
      }

      await this.statisticService.save(userSaved._id, statistic);
      return userSaved;
    } catch (error) {
      console.log('errr', error)
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
  async getUser(userId: string) {
    try {
      const user: any = await this.userModel.findById(ObjectId(userId));
      return user;
    } catch (error) {
      return {
        error: error.toString()
      }
    }
  }

  async login(signinDto: Login): Promise<any> {
    const { email, password } = signinDto;
    const user: any = await this.userModel.findOne({ email });
    if (!user) {
      return {
        error: 'Este usuario no existe'
      }
    }
    const isMatch = password == user.password ? true : false;//await compare(password, user.password);
    if (!isMatch) {
      return {
        error: 'Credenciales invalidas'
      }
    }
    const payload: IJwtPayload = {
      userId: user._id,
      email: user.email
    };
    const token = await this._jwtService.sign(payload);
    return { token, name: user.email, gender: user.gender };
  }

  async generatePasswordRand(length: number, type: string): Promise<any> {
    let characters: any = "";
    switch (type) {
      case 'num':
        characters = "0123456789";
        break;
      case 'alf':
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        break;
      case 'rand':
        //FOR ↓
        break;
      default:
        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        break;
    }
    let pass = "";
    for (let i = 0; i < length; i++) {
      if (type == 'rand') {
        pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
      } else {
        pass += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    return pass;
  }

  async saveCsv(): Promise<any> {
    let errors:any=[];
    try {

      const parseador = csv({
        delimiter: ',',//Delimitador, por defecto es la coma ,
        cast: true, // Intentar convertir las cadenas a tipos nativos
        comment: '#' // El carácter con el que comienzan las líneas de los comentarios, en caso de existir
      });

      let usuarios: any = [];
      async function generatePasswordRandInter(length: number, type: string): Promise<any> {
        let characters: any = "";
        switch (type) {
          case 'num':
            characters = "0123456789";
            break;
          case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case 'rand':
            //FOR ↓
            break;
          default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
        }
        let pass = "";
        for (let i = 0; i < length; i++) {
          if (type == 'rand') {
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
          } else {
            pass += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        }
        return pass;
      }

      parseador.on('readable', async function () {
        let fila: string;
        while (fila = parseador.read()) {
          let contraseña: any = await generatePasswordRandInter(8, 'alf');
          let user: Iuser = {
            email: fila[0],
            password: contraseña

          }
          usuarios.push(user);

          // const createdUser = new this.userModel(user);
          // let userSaved = createdUser.save();
          // const createdUser = await new this.userModel(user);
          //let userSaved = await  createdUser.save();

          /*let statistic: Istatistic = {
            type: eTypeStatistics.registro,
            userId: userSaved._id
          }


          this.statisticService.save(userSaved._id, statistic);*/
        }
      });

      fs.createReadStream("./Usuarios.csv")
        .pipe(parseador)
        .on("end", async ()=> {
          console.log("Se ha terminado de leer el archivo");
          parseador.end();
          console.log('usuarios.length :>> ', usuarios.length);
          const unicos = usuarios.filter((valor, indice) => {
            return usuarios.indexOf(valor) === indice;
          });
          console.log('unicos.length :>> ', unicos.length);

          for (let index = 0; index < unicos.length; index++) {
            const usuario = unicos[index];

            const createdUser = await new this.userModel(usuario);
            let userSaved;
            try {
              userSaved = await createdUser.save();
            } catch (error) {
              errors.push(error);
            }
           

            let statistic: Istatistic = {
              type: eTypeStatistics.registro,
              userId: userSaved._id
            }


            this.statisticService.save(userSaved._id, statistic);

          }
          console.log('errors.length :>> ', errors.length);
        });

      parseador.on('error', function (err) {
        console.error("Error al leer CSV:", err.message);
        console.log('errr', err)
        let message = err.message ?? err.toString()
        return { error: message }
      });
    } catch (error) {
      errors.push(error)
    }




  }





  async getOneUser(email: string) {
    try {
      const user: any = await this.userModel.findOne({ email });
      return user;
    } catch (error) {
      return {
        error: error.toString()
      }
    }
  }

  async updateOneUser(userObject: any): Promise<any> {
  /*  try {
        let user: any = await this.userModel.findOne({ "email": userObject.email });
        
        if (user) {
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
    }*/

  }

}
