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
import * as bcrypt from 'bcrypt';

// import argon2 from 'argon2';

@Injectable({})
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
          mobileNo:dto.mobileNo,
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

  async SignInUser(dto: Authdto) {
    // const {email, password } = dto;


    console.log('Received email:', dto.email);
    console.log('Received password:', dto.password);

    const userData = await this.prisma.userSignup.findUniqueOrThrow({
      where: { emailId: dto.email },
    });

    console.log(userData);

    if (!userData) throw new UnauthorizedException('Credential Incorrect.');
    // console.log(userData);

    // console.log(password);

    // const pwdData = password === userData.password;
    const isPasswordValid = await bcrypt.compare(dto.password, userData.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) throw new ForbiddenException('Password Incorrect.');

    return 'login successfully';
  }

  // login
}
