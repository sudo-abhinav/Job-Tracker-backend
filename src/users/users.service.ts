import {
  ForbiddenException,
  Injectable,
  // Res,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
// import { PrismaClient } from '@prisma/client';
import { Authdto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response , Request } from 'express';
// import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants/constant';
import { Console, error, log } from 'console';
import { AuthService } from 'src/auth/auth.service';

@Injectable({})
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private authService: AuthService,
  ) {}

  testing(): string {
    return 'route validation successfully';
  }

  // hasing the passoworrd
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async data(): Promise<string> {
    return 'data is called';
  }

  async CreateUser(dto: Authdto) {
    // const hash = await argon.hash(dto.password)
    // const hash = await argon.hash(dto.password);
    // console.log(hash);

    const userData = await this.prisma.userSignup.findUniqueOrThrow({
      where: { emailId: dto.email },
    });

    if(userData){
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new ForbiddenException('Use Already Registered.. Try to Login')
        }
      }
    }

    if (dto.password.length <= 8 || dto.password.length >= 32) {
      return `password length is Not valid `;
    }
    // ! bug is here

    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const userData = await this.prisma.userSignup.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailId: dto.email,
          mobileNo: dto.mobileNo,
          password: hashedPassword,
        },
      });
      return userData;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Crenditial Taken please use different Mail id',
          );
        }
      }
      throw error;
    }
  }

  // logout(res:Response){[

  // ]}
  // ---------------------------------------------
  async signInUser(
    _email: string,
    _password: string,
    res: Response
  ): Promise<{ access_token: string } | { error: string }> { // Adjusted return type
    try {
      
      const userData = await this.prisma.userSignup.findUniqueOrThrow({
        where: { emailId: _email },
      });

      // Verify the password
      const isPasswordValid = await bcrypt.compare(_password, userData.password);

      if (isPasswordValid) {
        // Generate an access token
        const { access_token } = await this.authService.generateAccessToken(
          userData.id,
          userData.emailId
        );

        
        res.cookie('access_token', access_token, {
          httpOnly: true,
          secure: true, // Ensure this is set to true in production (HTTPS)
          sameSite: 'strict',
        });

        // Returning the token object
        return { access_token };
      } else {
        return { error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error(error);
      return { error: 'An error occurred during login' };
    }
  }


}

