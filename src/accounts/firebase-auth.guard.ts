// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountsService } from './accounts.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private accountService: AccountsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer Token
    if (!token) {
        throw new UnauthorizedException('No token provided');
    }

    return this.validateToken(context, token);
}

async validateToken(context: ExecutionContext, token: string): Promise<boolean> {
    try {
        const request = context.switchToHttp().getRequest();
        request.userData = await this.accountService.validateUser(token);
        return true;
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
  }
}
