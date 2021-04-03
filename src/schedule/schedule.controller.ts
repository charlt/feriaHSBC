import { Controller, Post, Get, Body, Put, Res, HttpStatus, UseGuards, Req, Param } from '@nestjs/common';
import { ScheduleService } from './services/schedule.service';
import { ScheduleDto } from './dto/schedule.dto';

@Controller('schedule')
export class ScheduleController {

    constructor(private readonly scheduleService: ScheduleService) { }
    @Post('/create')
    async saveSchedule(@Req() req: any, @Res() res, @Body() scheduleDto: ScheduleDto): Promise<any> {
      try {
        let schedule: any = await this.scheduleService.save(scheduleDto);
        if (!schedule.error) {
          return res.status(HttpStatus.OK).json({
            message: 'schedule succesfully created',
            schedule,
            statusCode: 200
          })
        } else {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: schedule.error,
            statusCode: 400
          })
        }
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'A ocurrido un error inesperado',
          statusCode: 400
        })
      }
    }
  
   
    @Get('/:type')
    async getSchedule(@Res() res, @Param('type') type): Promise<any> {
      try {
        let schedule: any = await this.scheduleService.getSchedule(type);
        if (!schedule.error) {
          return res.status(HttpStatus.OK).json({
            message: 'schedule succesfully consulted',
            schedule,
            statusCode: 200
          })
        } else {
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: schedule.error,
            statusCode: 400
          })
        }
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'A ocurrido un error inesperado',
          statusCode: 400
        })
      }
    }

}
