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
import { Response } from 'express';

@Injectable({})
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

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
  async SignInUser(_email: string, _password: string, res: Response) {
    // const {email, password } = dto;

    console.log('Received email:', _email);
    console.log('Received password:', _password);
    // console.log(res);

    try {
      const userData = await this.prisma.userSignup.findUniqueOrThrow({
        where: { emailId: _email },
      });

      const isPasswordValid = await bcrypt.compare(
        _password,
        userData.password,
      );

      if (userData && isPasswordValid) {
        const userToken = this.genrateAccessToken(
          userData.id,
          userData.emailId,
        );
        res.cookie('access_token', userToken, {
          httpOnly: true,
          secure: true, // consider this option if your app uses HTTPS
          sameSite: 'strict',
        });
        return res.status(200).send('Logged in');
      } else {
        return res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred during login');
    }
  }

  async genrateAccessToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    // async signToken(userId: number, email: string) : Promise<jwtData> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });
    return {
      access_token: token,
    };
    // ? it will give you some good error so we have to change promise type
  }
  // login
}
