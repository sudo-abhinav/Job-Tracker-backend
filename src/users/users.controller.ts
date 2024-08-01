import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Authdto } from './dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  GetAllData() {
    return this.userService.data();
  }

  @Post('userSignUp')
  signUp(@Body() authDto: Authdto) {
    return this.userService.CreateUser(authDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() authDto: Authdto, @Res() res: Response) {
    await this.userService.SignInUser(authDto.email, authDto.password, res);
  }

// async signOut(@Body(), res:Response){
//   return `logout successfully`
  // }
}
