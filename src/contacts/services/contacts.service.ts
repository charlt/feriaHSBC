import { Injectable } from '@nestjs/common';
import { IContact } from '../interfaces/contact.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema';
import { User, UserDocument } from '../../user/schemas/user.schema';
let request = require('request-promise');
const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }
/**
 * Función encargada de guardar los contactos de un usuario
 * 
 * @param contacts Arreglo de contactos a registrar
 * @param userId Identificador de usuario
 */
  async create(contacts: Array<IContact>, userId: string) {
    try {
      const existUser: any = await this.userModel.findById(userId);
      if (!existUser) {
        return {
          error: 'El usuario no existe'
        }
      }
      let phoneValidate = [];
      if (contacts.length) {
        for (const contact of contacts) {
          let params = {
            'user-id': 'charlesBernabe',
            'api-key': 'KxpUf0sCeC0phz5rXr3FAjWhqiTsvxiuEtUFtmonBBzCZpqd',
            'number': contact.code + String(contact.phone)
          };
          let result = await request({ method: "POST", uri: 'https://neutrinoapi.net/phone-validate', form: params })
           
          let jsonResult =JSON.parse(result);// { valid: true }
          if (jsonResult.valid) {
            contact.user = userId;
            const createdContact = new this.contactModel(contact);
            let contactRegister: any = await createdContact.save();
            phoneValidate.push({
              'Contact': contact.contactName,
              'Valid': jsonResult.valid,
              'Register': true,
              contactRegister
            })
          } else {
            phoneValidate.push({
              'Contact': contact.contactName,
              'Valid': jsonResult.valid,
              'Register': false,
              'contactRegister': false
            })
          }
        }
        return phoneValidate;

      } else {
        return { error: "No es posible iterar el request" }
      }
    } catch (error) {
      return { error: error.toString() }
    }

  }

/**
 * Función encargada de actualizar los contactos de un usuario por medio de un arreglo
 *  
 * @param updateContactDto Arreglo de contactos a acTualizar
 * @param userId Identificador de usuario a actualizar los contactos
 */
  async update(updateContactDto: Array<any>, userId: string) {
    try {
      let phoneValidate = [];
      const existUser: any = await this.userModel.findById(userId);
      if (!existUser) {
        return {
          error: 'El usuario no existe'
        }
      }
      if (updateContactDto.length) {
        for (const contact of updateContactDto) {
          let params = {
            'user-id': 'charlesBernabe',
            'api-key': 'KxpUf0sCeC0phz5rXr3FAjWhqiTsvxiuEtUFtmonBBzCZpqd',
            'number': contact.code + String(contact.phone)
          };
          let result = await request({ method: "POST", uri: 'https://neutrinoapi.net/phone-validate', form: params })
          let jsonResult = JSON.parse(result);//{ valid: true } 
          if (jsonResult.valid) {
            const updatedContact = await this.contactModel.findByIdAndUpdate(contact._id, {
              contactName: contact.contactName,
              phone: String(contact.phone),
              code: contact.code
            }, { new: true });
            if (updatedContact) {
              phoneValidate.push({
                'Contact': contact.contactName,
                'Valid': jsonResult.valid,
                'Updated ': true,
                updatedContact
              })
            } else {
              phoneValidate.push({
                'Contact': contact.contactName,
                'Valid': jsonResult.valid,
                'Updated ': false,
                'message': 'Contacto no encontrado'
              })
            }

          } else {
            phoneValidate.push({
              'Contact': contact.contactName,
              'Valid': jsonResult.valid,
              'Updated': false
            })
          }
        }
        return phoneValidate;

      } else {
        return { error: "No es posible iterar el request" }
      }
    } catch (error) {
      return {
        error: error.toString()
      }
    }
  }

/**
 * Función que busa los contactos de un usuario
 * 
 * @param userId Identificador de usuario a consultar sus contactos
 */
  async findContacts(userId: string) {
    try {
      const existUser: any = await this.userModel.findById(userId);
      if (!existUser) {
        return {
          error: 'El usuario no existe'
        }
      }
      let contacts: any = this.contactModel.find({ user: ObjectId(userId) })
      return contacts
    } catch (error) {
      return {
        error: error.toString()
      }
    }
  }
  /**
   * Función que busca los match de contactos entre dos usuarios por medio de su identificador.
   * 
   * @param userId1 Identificador de usuario 1 
   * @param userId2 Identificador de usuario 2
   */
  async getCommonContacts(userId1: string, userId2: string) {
    try {
      let responseu1:any=[];
      let responseu2:any=[];
      const existUser: any = await this.userModel.findById(userId1);
      if (!existUser) {
        return {
          error: `El usuario ${userId1} no existe`
        }
      }
      const existUser2: any = await this.userModel.findById(userId2);
      if (!existUser2) {
        return {
          error: `El usuario ${userId2} no existe`
        }
      }
      let contactsUser1: any = await this.contactModel.aggregate([{
        $match: { user: ObjectId(userId1) }
      }])
      let contactsUser2: any = await this.contactModel.aggregate([{
        $match: { user: ObjectId(userId2) }
      }])

      if (contactsUser1.length > contactsUser2.length) {
        for (const contact of contactsUser1) {
          const common: any = contactsUser2.find(contactU1 => contact.phone == contactU1.phone && contact.code == contactU1.code)  
          if(common){
            responseu1.push(contact);
            responseu2.push(common);
          }
        }
      } else {
        for (const contact of contactsUser2) {
          const common: any = contactsUser1.find(contactU2 => contact.phone == contactU2.phone && contact.phone == contactU2.phone)  
          if(common){
            responseu2.push(contact);
            responseu1.push(common);
          }
        }
      }
      return{
        user1:responseu1,
        user2:responseu2
      }
    } catch (error) {
      return {
        error: error.toString()
      }
    }
  }
}
