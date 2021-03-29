import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
const ObjectId = require('mongodb').ObjectId;

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
    @Prop({ required: true })
    Id: number;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    start: Date;
    @Prop({ required: true })
    finish: Date;
    @Prop({ required: false })
    type: string;
    @Prop({ required: false })
    url: string;

}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);