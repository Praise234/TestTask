import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.userData;  // Return the user data attached in the guard
    }
);
