import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/Prisma.service';
import { jwtConstants } from './constants/constant';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    // private config: ConfigService,
  ) {}

  async generateAccessToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    // Sign the token with the secret and set an expiration time
    const token = await this.jwtService.signAsync(
      payload,
      //   {
      //   secret: jwtConstants.secret,
      //   expiresIn: '1d',
      // }
    );

    return { access_token: token };
  }

  //     // ? it will give you some good error so we have to change promise type
  //   }
}
