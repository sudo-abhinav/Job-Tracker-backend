/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './Prisma.service';

@Global()
@Module({
  imports:[],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
