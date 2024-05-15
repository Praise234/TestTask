import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
@Dependencies(Reflector, AccountsService)
export class RolesGuard {
    constructor(private reflector: Reflector, private accountService: AccountsService) {}

  canActivate(context:ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer Token
    // return roles.includes(user.roles);
    return this.matchRoles(roles, token);
  }

  private async matchRoles(requiredRoles: string[], token: string): Promise<boolean> {

      const {email} = await this.accountService.validateUser(token);

      const userData = await this.accountService.findOne(email);
      

    return requiredRoles.includes(userData.accountType);
  }
    
}
