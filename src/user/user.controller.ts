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
      if (!user.error) {
        return res.status(HttpStatus.OK).json({
          message: 'User succesfully created',
          user,
          statusCode: 200
        })
      } else {

        let index = user.error.indexOf("email_unique_index");
        let message: string;
        index != -1 ? 'Este email ya ha sido registrado' : '';
        let index2 = user.error.indexOf("phone_unique_index");
        index != -1 ? message = 'Este email ya ha sido registrado' : null;
        index2 != -1 ? message = 'Este número telefonico ya ha sido registrado' : null;

        return res.status(HttpStatus.BAD_REQUEST).json({
          message: message != undefined ? message : user.error,
          statusCode: 400
        })
      }
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
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
        statusCode: 200
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 400
      })
    }

  }



}
