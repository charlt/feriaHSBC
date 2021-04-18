import { eTypesSchedule } from '../../schedule/enums/type.enum';
export interface Istatistic {
    userId: string;
    type:string;
    typeSchedule?: eTypesSchedule
}