import { Controller, Post, Get, Body, Put, Res, HttpStatus, UseGuards, Req, Param } from '@nestjs/common';
import { ScheduleService } from './services/Schedule.service';
import { ScheduleDto } from './dto/Schedule.dto';

@Controller('schedule')
@Controller()
export class ScheduleController {

    constructor(private readonly scheduleService: ScheduleService) { }
    @Post('/create')
    async saveSchedule(@Req() req: any, @Res() res, @Body() scheduleDto: ScheduleDto): Promise<any> {
      try {
        let schedule: any = await this.scheduleService.save(req.user.Id, scheduleDto);
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
  
    @Put()
    async updateSchedule(@Res() res, @Body() scheduleObject: any): Promise<any> {
      try {
        let schedule: any = await this.scheduleService.update(scheduleObject);
        if (!schedule.error) {
          return res.status(HttpStatus.OK).json({
            message: 'Schedule succesfully updated',
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

    @Get('/:type/:temporality')
    async getSchedule(@Res() res, @Param('type') type, @Param('temporality') temporality): Promise<any> {
      try {
        let schedule: any = await this.scheduleService.getSchedule(type, temporality);
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
