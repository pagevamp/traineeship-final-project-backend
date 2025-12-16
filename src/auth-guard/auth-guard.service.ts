import { JwtPayload } from '@/types/JwtPayload';
import { verifyToken } from '@clerk/backend';
import type { ClerkClient } from '@clerk/backend';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    @Inject('ClerkClient')
    private readonly clerkClient: ClerkClient,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    const bearerToken = authHeader?.startsWith('Bearer')
      ? authHeader.substring(7)
      : null;

    if (!bearerToken) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const tokenToVerify = bearerToken;
      const tokenResult: JwtPayload = await verifyToken(tokenToVerify, {
        secretKey: this.configService.get('CLERK_SECRET_KEY'),
      });

      if ('errors' in tokenResult) {
        throw new UnauthorizedException('Invalid session');
      }

      const user = await this.clerkClient.users.getUser(tokenResult.sub!);
      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
