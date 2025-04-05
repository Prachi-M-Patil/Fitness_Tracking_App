import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Exercise } from "./Exercise";

@Entity({name: 'Workout_Ft_Tracker'})
export class Workout{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    duration: number;//in minutes

    @Column()
    date: Date;

    @Column()
    caloriesBurned : number;

    @ManyToOne(()=> User, user => user.workouts)
    user: User;

}