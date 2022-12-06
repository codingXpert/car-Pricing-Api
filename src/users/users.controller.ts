import {
    Body,
    Controller,
    Post,
    Get,
    Delete,
    Patch,
    Param,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { updateUserDto } from './dtos/update-user-dto';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { UsersService } from './users.service';
  import { Serialize } from 'src/interceptors/serialize.interceptor';
  import { UserDto } from './dtos/user.dto';
import { serialize } from 'v8';
  
  @Controller('auth')
  @Serialize(UserDto)
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
      this.usersService.create(body.email, body.password);
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