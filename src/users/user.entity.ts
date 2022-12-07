import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { UsersController } from './users.controller';
 
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
   
    password: string;
  
    @AfterInsert()    // Hook after Insert
    logInsert() {
      console.log('Inserted User with id', this.id);
    }
  
    @AfterUpdate()   // Hook after Update
    logUpdate() {
      console.log('Updated User with id', this.id);
    }
  
    @AfterRemove()
    logRemove() {
      console.log('Removed User with id', this.id);
    }
  }