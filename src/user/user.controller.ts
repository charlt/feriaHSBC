import { Controller, Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('/create')
  async saveUser(@Res() res, @Body() userDto: UserDto): Promise<any> {
    try {
      let user: any = await this.userService.save(userDto);
      if(!user.error){
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully created',
          user,
          statusCode:200
        })
      }else{
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: user.error,
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


  @Get()
  async getUsers(@Res() res): Promise<any> {
    try {
      let users: Array<any> = await this.userService.getUsers();
      return res.status(HttpStatus.OK).json({
        message: 'success',
        data: users,
        statusCode:200
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode:400
      })
    }

  }


  
}
