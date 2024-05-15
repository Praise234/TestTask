import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseAuthGuard } from '../Guards/firebase-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';


@Controller({path: 'images', version: '1'})
@UseGuards(FirebaseAuthGuard)
@UseGuards(RolesGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // upload an image
  @Post('upload')
  @Roles(['B'])
  @UseInterceptors(FileInterceptor('imgFile'))
  create(@UploadedFile() imgFile: Express.Multer.File) {
    console.log(imgFile); 
    return this.imagesService.create(imgFile);
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
