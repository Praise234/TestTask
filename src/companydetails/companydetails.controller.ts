import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompanydetailsService } from './companydetails.service';
import { Prisma } from '@prisma/client';
import { FirebaseAuthGuard } from 'src/accounts/firebase-auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('v1/companydetails')
@UseGuards(FirebaseAuthGuard)
export class CompanydetailsController {
  constructor(private readonly companydetailsService: CompanydetailsService) {}

  // create new company
  @Post()
  create(@Body() createCompanydetailDto: Prisma.CompanyDetailsCreateInput, @GetUser() userData: any ) {
    return this.companydetailsService.create(createCompanydetailDto, userData);
  }

  // find all company
  @Get()
  findAll() {
    return this.companydetailsService.findAll();
  }

  // find company by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companydetailsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanydetailDto: UpdateCompanydetailDto) {
  //   return this.companydetailsService.update(+id, updateCompanydetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companydetailsService.remove(+id);
  // }
}
