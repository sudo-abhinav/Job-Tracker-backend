import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('signIn')
  signUp(@Body() authDto: Authdto) {
    return this.userService.SignInUser(authDto);
  }
}
