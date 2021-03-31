import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  phone: string;
  @Prop({ required: true })
  department: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  job: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  /*@Prop({ required:true })
  calle: string;
  @Prop({ required:true })
  exterior: string;
  @Prop({ required:true })
  interior: string;
  @Prop({ required:true })
  estado: string;
  @Prop({ required:true })
  municipio: string;
  @Prop({ required:true })
  colonia: string;
  @Prop({ required:true })
  ciudad: string;*/

}

export const UserSchema = SchemaFactory.createForClass(User);