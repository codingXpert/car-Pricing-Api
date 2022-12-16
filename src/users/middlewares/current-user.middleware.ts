import { Injectable , NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global{
    namespace Express {           // these lines are going to add or update and additional property to an existing interface
        interface Request {      //  so , we are saying that go and find the express library , find interface called request , inside there 
            currentUser?: User; //   and we are going to add in one more property to that interface
        }
    }
}

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