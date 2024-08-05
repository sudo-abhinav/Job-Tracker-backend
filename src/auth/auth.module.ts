import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constant';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/Prisma.service';

@Module({
  imports: [ConfigModule , JwtModule.register({
    global:true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }) ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
