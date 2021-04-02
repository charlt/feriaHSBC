import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, ){
        super({
            jwtFromRequest:ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey:'HSBCSecret'
        })
    }


    async validate(payload:IJwtPayload){
        const {email}=payload;
        const user = this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException();
        }
        return payload;
    }
}