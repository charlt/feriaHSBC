import { Controller, Res,Query, Get, Post, Body, Put, Param, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactDto } from "./dto/contact.dto";

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post('/create/:userId')
  async create(@Param('userId') userId, @Res() res, @Body() contactDto: Array<ContactDto>) {
    try {
      let data: any = await this.contactsService.create(contactDto, userId);
      if (!data.error) {
        return res.status(HttpStatus.OK).json({
          message: 'contact succesfully created',
          data,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: data.error,
          statusCode: 400
        })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 500
      })
    }
  }

  @Get("/getContacts/:userId")
  async findContacts(@Param('userId') userId, @Res() res) {
    try {
      let data: any = await this.contactsService.findContacts(userId);
      if (!data.error) {
        if (data.length > 0) {
          return res.status(HttpStatus.OK).json({
            message: 'Success',
            data,
            statusCode: 200
          })
        } else {
          return res.status(HttpStatus.OK).json({
            message: 'No existen contactos asociados a este usuario',
            error: 'Not Found',
            statusCode: 404
          })
        }

      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: data.error ?? 'Error',
          statusCode: 400
        })
      }
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 500
      })
    }
  }

  @Put('/edit/:userId')
  async update(@Param('userId') userId, @Res() res, @Body() updatecontactDto: Array<ContactDto>) {

    try {
      let data: any = await this.contactsService.update(updatecontactDto, userId);
      if (!data.error) {
        return res.status(HttpStatus.OK).json({
          message: 'contact succesfully updated',
          data,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: data.error,
          statusCode: 400
        })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 500
      })
    }
  }


  @Get('/commonContacts')
  async getCommonContacts(@Query('userId1') userId1: string,@Query('userId2') userId2: string,@Res() res) {
    try {
      let data: any =  await this.contactsService.getCommonContacts(userId1,userId2);
      if (!data.error) {
        return res.status(HttpStatus.OK).json({
          message: 'success',
          data,
          statusCode: 200
        })
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: data.error,
          statusCode: 400
        })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'A ocurrido un error inesperado',
        statusCode: 500
      })
    }
  }
}
