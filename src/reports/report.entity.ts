import { Entity , Column , PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Report{

    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    price:Number;
}