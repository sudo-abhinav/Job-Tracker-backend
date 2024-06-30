/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
// implements OnModuleInit
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  // async onModuleInit() {
  //   await this.$connect();
  // }
}
