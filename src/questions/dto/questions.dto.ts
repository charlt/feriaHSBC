import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionsDto {

  readonly question: string;

  readonly cluster:string;

  readonly token:string;

}