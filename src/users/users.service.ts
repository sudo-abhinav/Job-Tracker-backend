/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
// import { PrismaClient } from '@prisma/client';
import { Authdto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// import * as argon from 'argon2';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// import argon2 from 'argon2';

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
  // ---------------------------------------------
  async SignInUser(_email: string, _password: string) {
    // const {email, password } = dto;

    console.log('Received email:', _email);
    console.log('Received password:', _password);

    try {
      const userData = await this.prisma.userSignup.findUniqueOrThrow({
        where: { emailId: _email },
      });

      // console.log(userData);

      if (!userData) throw new UnauthorizedException('Credential Incorrect.');

      // const pwdData = password === userData.password;
      const isPasswordValid = await bcrypt.compare(
        _password,
        userData.password,
      );
      console.log(isPasswordValid);

      if (!isPasswordValid) throw new ForbiddenException('Password Incorrect.');

      // const payload = {
      //   id: userData.id,
      //   email: userData.emailId,
      //   mobile: userData.mobileNo,
      // };
      // return {
      //   access_token: await this.jwtService.signAsync(payload),
      // };

      return this.signToken(userData.id, userData.emailId);
    } catch (error) {
      console.log(error);
    }
  }

  async signToken(
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
