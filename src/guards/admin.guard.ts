import { CanActivate , ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext){   // the execution context is like a wrapper around the incoming request
      const request = context.switchToHttp().getRequest();
      if(!request.currentUser) {
        return false;
      }
       return request.currentUser.admin;

    }

}