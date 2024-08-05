import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { jwtConstants } from '../constants/constant'; // Check the path correctness
 
  
  @Injectable()
  export class RouteAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromCookie(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        request['user'] = payload;
        return true; // Ensure the method returns a boolean
      } catch {
        console.error('here is error ')
        throw new UnauthorizedException();
      }
    }
  
    private extractTokenFromCookie(request: Request): string | undefined {
      return request.cookies?.access_token; // Adjust 'token' to the actual cookie name used
    }
  }
  