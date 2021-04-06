import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
const ObjectId = require('mongodb').ObjectId;

export type QuestionsDocument = Questions & Document;

@Schema()
export class Questions {
  @Prop({ type: ObjectId, ref: 'User' })
  userId: string;
  @Prop({ default:Date.now })
  createdAt: Date;
  @Prop({ required: true })
  question: string;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);