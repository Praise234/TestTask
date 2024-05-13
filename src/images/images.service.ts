import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ImagesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(imgFile: Express.Multer.File, userData:any) {

    const {accountType} = await this.databaseService.accounts.findFirst({
      where: {email: userData.email}
    })

    if(accountType === "A") {
      throw new UnauthorizedException('You are not authorized to perform this operation');
    }

    
     // Validate that the file is an image
     if (!imgFile) {
      throw new BadRequestException('Please upload an image');
    }
    
     if (!imgFile.mimetype.startsWith('image/')) {
      throw new BadRequestException('Invalid file type. Only image files are allowed.');
    }

    try {
      const imgFileBase64 = imgFile.buffer.toString('base64'); // convert image to base64


      const imageUpload = await this.databaseService.images.create({ // save base64 image
        data: {url: imgFileBase64,mimeType: imgFile.mimetype}
      });

      console.log(await this.databaseService.notifications.create({ // save notification
        data: {
          activityId: imageUpload.id,
          notificationType: 'NEWIMAGE',
          recepientId: 1
        }
      }))

      if(! await this.databaseService.notifications.create({ // save notification
        data: {
          activityId: imageUpload.id,
          notificationType: 'NEWIMAGE',
          recepientId: 1
        }
      })) throw new BadRequestException('Notification Error');

      return {statusCode: 201, imageUpload, message: "Image uploaded successfully"}

      
    } catch (error) {
      throw new BadRequestException('An error occurred', error);
    }



    
  }

  async findAll() {
    
    try {
      

      const images = await this.databaseService.images.findMany({});

      return {statusCode:200, images, message: "Images fetched successfully"}


    } catch (error) {
      throw new BadRequestException('An error occurred', error);
    }

  }

  async findOne(id: number) {
    
    try {

      const image = await this.databaseService.images.findFirst({
        where: {
          id
        }
      });

      if(image === null) {
        throw new NotFoundException('Record does not exist');
      }

      return {statusCode:200, image, message: "Image fetched successfully"}
      
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

  // update(id: number, updateImageDto: UpdateImageDto) {
  //   return `This action updates a #${id} image`;
  // }

  remove(id: number) {
    return this.databaseService.images.delete({
      where:{id}
    })
  }
}
