import { Expose , Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class ReportDto {
  
  @Expose()  
  id : number;

  @Expose() 
  price : number;

  @Expose() 
  year : number;

  @Expose() 
  lan : number;

  @Expose() 
  lat : number;

  @Expose() 
  make : string;

  @Expose() 
  model : string;

  @Expose() 
  mileage : string; 
  
  
  @Transform(({  obj }) => obj.user.id)  // obj is the refrence to the original report entity . From here 
                                        //  take the user id and assign it to this brand new property that we 
                                       //   are adding in called user ID (user ID)
  @Expose()
  userId : number
}