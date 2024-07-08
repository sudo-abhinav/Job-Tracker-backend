/* eslint-disable prettier/prettier */
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"


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

    @IsAlphanumeric()
    @IsNotEmpty()
    password:string   
}


// ! thses pipes are not woking until we dont declare in main file we made pipes global for nestJS







