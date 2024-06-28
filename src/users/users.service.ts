/* eslint-disable prettier/prettier */  
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/Prisma.service';
import {Authdto} from './dto'

@Injectable()
export class UsersService {
constructor(private prisma:PrismaService){}
    data():string{
        return 'data is called'
    }

    async CreateUser(dto:Authdto){
        const userData = await this.prisma.userSignup.create({
            data:{
                firstName:dto.firstName,
                lastName:dto.lasName,
                emailId:dto.email,
                password:dto.password

            },

        })
        return userData
    }
}
