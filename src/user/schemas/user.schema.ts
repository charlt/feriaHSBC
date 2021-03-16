import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  department: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  job: string;
  @Prop({ required: true })
  email: string;
  @Prop({ default:Date.now })
  createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);