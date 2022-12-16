import { Injectable , NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService:UsersService){}
    async use(req:Request , res:Response , next:NextFunction){
         const { userId } = req.session || {};

         if(userId){
            const user = await this.userService.findOne(userId);
            //@ts-ignore
            req.currentUser = user;
         }
         next();      // calling next() means , the work of the above function is over , go and 
                     //  run weather other middleware might exist 
                       
    }
}