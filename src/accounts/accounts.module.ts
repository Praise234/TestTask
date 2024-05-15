import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseAuthGuard } from '../Guards/firebase-auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';

@Module({
  imports: [DatabaseModule, ConfigModule],
  controllers: [AccountsController],
  providers: [AccountsService, FirebaseAuthGuard, FirebaseService, RolesGuard],
})
export class AccountsModule {}
