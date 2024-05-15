import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Prisma } from '@prisma/client';
import { LoginAccountDto } from './dto/login-account.dto';
import { GetUser } from 'src/decorators/user.decorator';
import { FirebaseAuthGuard } from '../Guards/firebase-auth.guard';


@Controller({path: 'accounts', version: '1'})
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

  @UseGuards(FirebaseAuthGuard)
  @Post('logout')
  logout(@GetUser() userData: any) {

    if (!userData) {
      return { message: 'No token provided' };
  }
  
    
    return this.accountsService.logout(userData);

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
