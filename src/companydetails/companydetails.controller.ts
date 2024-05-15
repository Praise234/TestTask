import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CompanydetailsService } from './companydetails.service';
import { Prisma } from '@prisma/client';
import { FirebaseAuthGuard } from '../Guards/firebase-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/Guards/roles.guard';
import path from 'path';

@Controller({path: 'companydetails', version: '1'})
@UseGuards(FirebaseAuthGuard)
@UseGuards(RolesGuard)
export class CompanydetailsController {
  constructor(private readonly companydetailsService: CompanydetailsService) {}

  // create new company
  @Post()
  @Roles(['A'])
  create(@Body() createCompanydetailDto: Prisma.CompanyDetailsCreateInput ) {
    return this.companydetailsService.create(createCompanydetailDto);
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
