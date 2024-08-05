/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator"


// ! now i am adding class-validator & calss-transformer from nest pipes so we can add validation 
// ! so i have to convert interface to class

export class Authdto{ 

    @IsString()
    @IsNotEmpty()
    firstName :string

    // ---------------
    @IsString()
    @IsOptional()
    lastName?:string
// -----------

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsNumber()
    @IsPhoneNumber('IN')
    @IsOptional()
    mobileNo?:string

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too weak'})
    password: string;  
}


// ! thses pipes are not woking until we dont declare in main file we made pipes global for nestJS







