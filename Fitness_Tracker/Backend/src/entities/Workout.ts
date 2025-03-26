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
    duration: number;

    @Column()
    date: Date;

    @ManyToOne(()=> User, user => user.workouts)
    user: User;

    @OneToMany(()=> Exercise, exercise => exercise.workout)
    exercises: Exercise[];

}