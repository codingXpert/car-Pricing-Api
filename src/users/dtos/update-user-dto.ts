import { IsEmail , IsString , IsOptional } from "class-validator";
export class updateUserDto{
    @IsEmail()
    @IsOptional()
    email:string


    @IsString()
    @IsOptional()
    password:string
}