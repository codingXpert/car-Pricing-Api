import { IsEmail , IsString } from "class-validator"

export class CreateUserDto{
    @IsEmail()
    email:String ;
    
    @IsString()
    password:String;
}