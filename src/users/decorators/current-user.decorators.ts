import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data:any , context:ExecutionContext)=>{       // the execution context is the upcoming request
          return 'hi there!'
    }
)