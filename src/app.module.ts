import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AccountsModule } from './accounts/accounts.module';
import { CompanydetailsModule } from './companydetails/companydetails.module';
import { ImagesModule } from './images/images.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FirebaseService } from './firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, AccountsModule, CompanydetailsModule, ImagesModule, NotificationsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
