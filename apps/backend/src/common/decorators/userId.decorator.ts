import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request.userId) {
      throw new Error(
        [
          '@UserId decorator requires userId to be present on the request.',
          'This route is likely marked as public, so userId is not available.',
          'Fix: Either remove the @Public() decorator or stop using @UserId.',
          `Location: ${ctx.getClass().name}.${ctx.getHandler().name}()`,
        ].join('\n'),
      );
    }

    return request.userId;
  },
);
