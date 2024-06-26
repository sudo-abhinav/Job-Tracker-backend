import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // * this is the best example of Dependency Inejction;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
