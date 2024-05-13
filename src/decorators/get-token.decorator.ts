import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string | null => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        return authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    }
);
