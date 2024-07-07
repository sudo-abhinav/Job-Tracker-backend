/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
// import { PrismaClient } from '@prisma/client';
import { Authdto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async data(): Promise<string> {
    return 'data is called';
  }

  async CreateUser(dto: Authdto) {
    const hash = await argon.hash(dto.password);
    try {
      const userData = await this.prisma.userSignup.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailId: dto.email,
          password: hash,
        },
      });
      return userData;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Crenditial Taken please');
        }
      }
      throw error;
    }
  }

  async SignInUser(dto:Authdto){

  }


  // login 

 
}
