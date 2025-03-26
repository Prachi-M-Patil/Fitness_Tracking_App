import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Goal_Ft_Tracker'})
export class Goal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goalType: string;

    @Column()
    target: string;

    @Column({default: false})
    achieved: boolean;

    @ManyToOne(()=> User, user => user.goals)
    user: User;

}