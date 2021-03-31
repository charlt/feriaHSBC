import { IsNotEmpty, IsString } from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  readonly start: Date;
  @IsNotEmpty()
  readonly finish: Date;
  @IsNotEmpty()
  @IsString()
  readonly type: string;
  @IsNotEmpty()
  @IsString()
  readonly url: string;
  @IsNotEmpty()
  @IsString()
  readonly fecha_visualizacion: Date;
}