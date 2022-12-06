import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService{
    constructor(private userService:UsersService){}

    async signup(email:string , password:string){

        //See if email is in use
              const users = await this.userService.find((email));
              if(users.length){
                throw new BadRequestException('email in use')
              }

        // Hash the user password

        // create a new user and save it

        // return the user
    }

    signin(){}
}

