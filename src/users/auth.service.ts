import { BadRequestException, Injectable, NotFoundException, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes , scrypt as _scrypt} from "crypto";  //randomBytes is going to generate our salt & scrypt is actual hashing function
import { promisify } from "util";  //  promisify is a function that will take in a function that makes use of callback 
                                   //  and it's going to give us back a version of that exact same function that instead makes use of promises 

 const scrypt = promisify(_scrypt);
                                   
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
        //Generate a salt(salt:- randomly generated number) 

        const salt = randomBytes(8).toString('hex');  //the randomBytes is going to return a buffer similar to array
                                                      //The difference is that a buffer holdes some raw data inside of it(in the form of 0 & 1)
                                                      //so we are going to take all that ones and zeros and turn it into a heaxadecimal string  ,
                                                      //which  basically means a bunch of random numbers and letters
                                                      // The 8 right here means that our buffer is going to have eight bytes
                                                      // Every one bit of data turns into two characters when we convert into hex.
                                                      // So our Hex is going to be a 16 character long string


        //Hash the salt and the password together
        const hash = (await scrypt(password , salt , 32)) as Buffer;  // 32 means just give us back 32 characters or 32 bytes worth

        // join the hash result and the salt together(store in DB)
        const result = salt + '.' + hash.toString('hex');  // here '.' is a seperator b/w salt and hash (the seperator can be any thing)




        // create a new user and save it
        const user = await this.userService.create(email , result);

        // return the user
      return user;
    }

    async signin(email:string  , password:string){
      const[user] = await this.userService.find(email);
      if(!user){
        throw new NotFoundException('user not found');
      }

      console.log(user.password);
      
      const [salt , storedHash] = user.password.split('.');

      const hash = (await scrypt(password , salt , 32)) as Buffer;

      console.log(storedHash  );
    console.log(hash.toString('hex'));
      
     
      if(storedHash !== hash.toString('hex')){
        throw new BadRequestException('Bad Password');
      }

      return user;

    }
}

