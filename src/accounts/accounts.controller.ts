import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Prisma } from '@prisma/client';
import { LoginAccountDto } from './dto/login-account.dto';
import { Response } from 'express';


@Controller('v1/accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: Prisma.AccountsCreateInput) {
    return this.accountsService.create(createAccountDto);
  }

  @Post('login')
  login(@Body() loginAccountDto: LoginAccountDto) {
    
    const userData =  this.accountsService.login(loginAccountDto);

   

    return userData;
  }

  // @Get()
  // findAll() {
  //   return this.accountsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.accountsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateAccountDto: Prisma.AccountsUpdateInput) {
  //   return this.accountsService.update(id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.accountsService.remove(id);
  // }
}
