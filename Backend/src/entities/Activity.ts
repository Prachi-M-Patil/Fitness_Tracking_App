import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Activity_Ft_Tracker'})
export class Activity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;//running, cycling, swimming

    @Column()
    duration: number;

    @Column()
    distance: number;

    @Column()
    date: Date;

    @ManyToOne(()=> User, user  => user.activities)
    user: User;


}