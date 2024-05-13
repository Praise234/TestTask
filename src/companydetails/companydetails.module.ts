import { Module } from '@nestjs/common';
import { CompanydetailsService } from './companydetails.service';
import { CompanydetailsController } from './companydetails.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AccountsService } from 'src/accounts/accounts.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanydetailsController],
  providers: [CompanydetailsService, AccountsService, FirebaseService, ConfigService],
})
export class CompanydetailsModule {}
