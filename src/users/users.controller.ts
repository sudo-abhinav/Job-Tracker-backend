/* eslint-disable prettier/prettier */

import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Get()
    GetAllData(){
        return this.userService.data();
    }

}
