import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { FirebaseAuthGuard } from 'src/accounts/firebase-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('v1/notifications')
@UseGuards(FirebaseAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @Post()
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationsService.create(createNotificationDto);
  // }

  @Get()
  findAll(@GetUser() userData: any) {
    return this.notificationsService.findAll(userData);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationsService.update(+id, updateNotificationDto);
  // }

  
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationsService.remove(+id);
  // }
}
