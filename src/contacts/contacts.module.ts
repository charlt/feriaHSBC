import { Module } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: User.name, schema: UserSchema }])
  ],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule { }
