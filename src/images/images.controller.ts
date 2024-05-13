import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseAuthGuard } from 'src/accounts/firebase-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';


@Controller('v1/images')
@UseGuards(FirebaseAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // upload an image
  @Post('upload')
  @UseInterceptors(FileInterceptor('imgFile'))
  create(@UploadedFile() imgFile: Express.Multer.File, @GetUser() userData: any) {
    console.log(imgFile); 
    return this.imagesService.create(imgFile, userData);
  }

  // get all images
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  // get image by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imagesService.update(+id, updateImageDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
