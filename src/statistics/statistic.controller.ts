import { Controller, Post, Get, Body,Put, Res, HttpStatus } from '@nestjs/common';
import { StatisticService } from './services/statistic.service';
import { StatisticDto } from './dto/statistic.dto';

@Controller('statistics')
export class StatisticController {

    constructor(private readonly statisticService: StatisticService) { }
    @Post('/create')
    async saveStatistic(@Res() res, @Body() statisticDto: StatisticDto): Promise<any> {
      try {
        let statistic: any = await this.statisticService.save(statisticDto);
        if(!statistic.error){
          return res.status(HttpStatus.OK).json({
            message: 'Statistic succesfully created',
            statistic,
            statusCode:200
          })
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: statistic.error,
            statusCode:400     
          })
        }
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'A ocurrido un error inesperado',
          statusCode:400
        })
      }
    }


    @Put()
    async updateStatistic(@Res() res, @Body() statisticObject:any): Promise<any> {
      try {
        let statistic: any = await this.statisticService.update(statisticObject);
        if(!statistic.error){
          return res.status(HttpStatus.OK).json({
            message: 'Statistic succesfully updated',
            statistic,
            statusCode:200
          })
        }else{
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: statistic.error,
            statusCode:400     
          })
        }
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'A ocurrido un error inesperado',
          statusCode:400
        })
      }
    }
    
 }
