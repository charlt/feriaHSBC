import { Controller, Post, Get, Body, Put, Res, HttpStatus, UseGuards, Req, Param } from '@nestjs/common';
import { QuestionsService } from './services/questions.service';
import { QuestionsDto } from './dto/questions.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionsService: QuestionsService) { }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async saveQuestions(@Req() req: any, @Res() res, @Body() questionsDto: QuestionsDto): Promise<any> {
    try {
      let questions: any = await this.questionsService.save(req.user.userId, questionsDto);
      if (!questions.error) {
        return res.status(HttpStatus.OK).json({
          message: 'question succesfully created',
          questions,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: questions.error,
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
