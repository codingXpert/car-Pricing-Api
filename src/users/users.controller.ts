import {
    Body,
    Controller,
    Post,
    Get,
    Delete,
    Patch,
    Param,
    Query,
    Session,
    NotFoundException,
  } from '@nestjs/common';
  import { updateUserDto } from './dtos/update-user-dto';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { UsersService } from './users.service';
  import { Serialize } from 'src/interceptors/serialize.interceptor';
  import { UserDto } from './dtos/user.dto';
  import { serialize } from 'v8';
  import { AuthService } from './auth.service';

 
  
  @Controller('auth')
  @Serialize(UserDto)
  export class UsersController {
    constructor(
      private usersService: UsersService,
      private authService:AuthService
      ) {}
  
    @Get('/whoami')
    whoAmI(@Session() session:any){   // This whoAmI is said to route handler
             return this.usersService.findOne(session.userId);  // if the user is not signed in then session.userId = Undefined
    }

    @Post('/signup')
     async createUser(@Body() body: CreateUserDto , @Session() session:any) {
      const user = await this.authService.signup(body.email , body.password);
      session.userId = user.id;
      return user;
    }

    @Post('/signin')
     async signin(@Body() body:CreateUserDto){
      const user =  await this.authService.signin(body.email , body.password);
      return user;
    }

    // @UseInterceptors(new SerializerInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string) {
      console.log('handler is running')
      const user =  this.usersService.findOne(parseInt(id));
      if(!user){
        throw new NotFoundException('user not found')
      }
      return user;
    }
  
    @Get()
    findAllUsers(@Query('email') email: string) {
      return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string , @Body() body:updateUserDto){
      return this.usersService.update(parseInt(id) , body);
    }
  }