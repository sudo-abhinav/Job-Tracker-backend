import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './users/UserAuth/Constant';
// import { PrismaService } from './prisma/Prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // * this global because anyone can use env file anywhwre
    }),
    UsersModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
