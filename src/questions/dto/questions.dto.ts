import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionsDto {
  @IsNotEmpty()
  @IsString()
  readonly question: string;
  @IsNotEmpty()
  @IsString()
  readonly cluster:string;

}