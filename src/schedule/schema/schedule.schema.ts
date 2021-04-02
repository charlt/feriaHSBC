import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
const ObjectId = require('mongodb').ObjectId;

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {

    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    start: Date;
    @Prop({ required: true })
    finish: Date;
    @Prop({ required: false })
    type: string;
    @Prop({ required: true })
    url: string;
    @Prop({ required: true })
    fecha_visualizacion:Date;
    @Prop({default: 'true'})
    status:string;
    @Prop({required: false,default: ''})
    video:string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);