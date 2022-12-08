import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data:never , context:ExecutionContext)=>{       // the execution context is the upcoming request
        const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    
          return 'hi there!'
    }
)