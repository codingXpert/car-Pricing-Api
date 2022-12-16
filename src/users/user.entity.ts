import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';

  import { UsersController } from './users.controller';
  import { Report } from 'src/reports/report.entity';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column({ default : true })
    admin : boolean;

    @OneToMany( () => Report , (report) => report.user )
    reports:Report[]
  
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