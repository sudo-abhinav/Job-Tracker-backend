import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { PrismaService } from 'src/prisma/Prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { AuthService } from 'src/auth/auth.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule ,AuthModule , ConfigModule],
  // imports: [PrismaModule , ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  // exports: [UsersService],
})
export class UsersModule {}
