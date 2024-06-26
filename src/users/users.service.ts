/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/Prisma.service';

@Injectable()
export class UsersService {
constructor(private prisma:PrismaService){}
    data():string{
        return 'data is called'
    }

    async CreateUser(){
        const userData = await this.prisma.userSignup.create({
            data:{
                firstName:
            },
        })
    }
}
