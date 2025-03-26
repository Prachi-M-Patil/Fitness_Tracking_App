import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Workout } from "./Workout";
import { Goal } from "./Goal";
import { Activity } from "./Activity";

@Entity({name: 'User_Ft_Tracker'})
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: String;

    @Column()
    password: String;

    @Column()
    mobile : number;

    @Column({ default: 'user' })
    role: string;

    @OneToOne(()=> Profile , profile => profile.user, {cascade: true})
    profile: Profile;

    @OneToMany(()=> Workout, workout => workout.user)
    workouts: Workout[];

    @OneToMany(()=> Goal, goal => goal.user)
    goals: Goal[];
    

    @OneToMany(()=> Activity, activity => activity.user)
    activities: Activity[];

    @ManyToMany(()=> User)
    @JoinTable()
    friends: User[];
    
    

}