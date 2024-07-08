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
import * as argon from 'argon2';

// import argon2 from 'argon2';

@Injectable({})
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async data(): Promise<string> {
    return 'data is called';
  }

  async CreateUser(dto: Authdto) {
    // const hash = await argon.hash(dto.password)
    // const hash = await argon.hash(dto.password);
    // console.log(hash);

    try {
      const userData = await this.prisma.userSignup.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailId: dto.email,
          password: dto.password,
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

  async SignInUser(dto: Authdto) {
    const { email, password } = dto;

    const userData = await this.prisma.userSignup.findFirstOrThrow({
      where: { emailId: email },
    });

    console.log(userData);

    if (!userData) throw new UnauthorizedException('Credential Incorrect.');
    console.log(userData);

    console.log(password);

    const pwdData = password === userData.password;
    console.log(pwdData);

    if (!pwdData) throw new ForbiddenException('Password Incorrect.');

    return 'login successfully';
  }

  // login
}
