import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AccountsService } from 'src/accounts/accounts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, AccountsService, FirebaseService, ConfigService],
})
export class NotificationsModule {}
