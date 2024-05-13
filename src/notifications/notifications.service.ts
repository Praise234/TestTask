import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly databaseService: DatabaseService) {}


  async findAll(userData:any) {
   

    
    const {id} = await this.databaseService.accounts.findFirst({
      where: {email: userData.email}
    })
    console.log(id)

    try {

      const notifications = await this.databaseService.notifications.findMany({
        where: {recepientId: id}
       });

     

      return {statusCode:200, notifications, message: notifications.length > 0 ? "Notificatons fetched successfully" : "No Notifications for now"}



      
    } catch (error) {
      if (error instanceof NotFoundException) {
        // catch any BadRequestExceptions
        throw error;
      } else {
        // handle unexpected errors
        throw new BadRequestException('An error occurred', error.message);
      }
    }



  }

}
