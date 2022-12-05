import {
    Body,
    Controller,
    Post,
    Get,
    Delete,
    Patch,
    Param,
    Query,
    NotFoundException
  } from '@nestjs/common';
  import { updateUserDto } from './dtos/update-user-dto';
  import { CreateUserDto } from './dtos/create-user.dto';
  import { UsersService } from './users.service';
  
  @Controller('auth')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
      this.usersService.create(body.email, body.password);
    }
  
    @Get('/:id')
    async findUser(@Param('id') id: string) {
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