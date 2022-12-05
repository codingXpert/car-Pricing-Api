import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  import { Exclude } from 'class-transformer'
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    @Exclude()
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