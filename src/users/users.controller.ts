import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Authdto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  GetAllData() {
    return this.userService.data();
  }

  @Post('userSignUp')
  signin(@Body() authDto: Authdto) {
    return this.userService.CreateUser(authDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signUp(@Body() authDto: Authdto) {
    return this.userService.SignInUser(authDto.email, authDto.password);
  }
}
