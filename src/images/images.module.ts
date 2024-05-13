import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AccountsService } from 'src/accounts/accounts.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [ImagesService, AccountsService, FirebaseService, ConfigService],
})
export class ImagesModule {}
