import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Authdto } from './dto';
import { Response } from 'express';
import { promises } from 'dns';
import { userSignup } from '@prisma/client';
import { get } from 'http';
import { RouteAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  GetAllData() {
    return this.userService.data();
  }
  @HttpCode(HttpStatus.OK)
  @Post('userSignUp')
  async signUp(@Body() authDto: Authdto) {
    return await this.userService.CreateUser(authDto);
  }

  // ----------------
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(
    @Body() authDto: Authdto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const verifiedData =  await this.userService.signInUser(authDto.email, authDto.password, res);
    return verifiedData;
  }
// --------------------
  @UseGuards(RouteAuthGuard)
  @Get('test')
  RouteValidate() {
    return this.userService.testing();
  }

  // async signOut(@Body(), res:Response){
  //   return `logout successfully`
  // }
}
