import { Entity,
   Column, 
   PrimaryGeneratedColumn,
   ManyToMany,
   ManyToOne
   } from 'typeorm';
   import { User } from 'src/users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make:string;

  @Column()
  model:string

  @Column()
  year:number

  @Column()
  lng:number

  @Column()
  lat:number

  @Column()
  mileage:number;

  @ManyToOne( () => User , (user) => user.reports)  // the first argument will return an User entity class that is wrapped up inside the function and 2nd argument take the instance of user and returns the user's reports 
  user:User
}
