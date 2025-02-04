import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { TokenService } from '../token/token.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;
    if (!auth) {
      throw new BadRequestException('Authorization is required');
    }
    const token = auth.split(' ')[1];
    try {
      request.payload = await this.tokenService.verifyToken(token);
      return true;
    } catch (error) {
      throw new ForbiddenException(error, 'Invalid token');
    }
  }
}
