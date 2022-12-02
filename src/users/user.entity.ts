import { Entity , Column , PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    name:String;

    @Column()
    email:String;
}