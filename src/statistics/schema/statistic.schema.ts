import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Mongoose } from 'mongoose';
const ObjectId = require('mongodb').ObjectId;

export type StatisticDocument = Statistic & Document;

@Schema()
export class Statistic {
  @Prop({ type: ObjectId, ref: 'User' })
  userId: string;
  @Prop({ type: ObjectId, ref: 'Schedule',required: false })
  scheduleId: string;
  @Prop({ default:Date.now })
  createdAt: Date;
  @Prop({ required: false })
  finishedAt: Date;
  @Prop({ required: false })
  typeSchedule: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: false })
  minutes: string;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);