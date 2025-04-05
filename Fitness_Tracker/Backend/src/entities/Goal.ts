import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Activity } from "./Activity";

@Entity({name: 'Goal_Ft_Tracker'})
export class Goal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goalType: string; //e.g. weight loss

    @Column()
    target: string; //loss 5 kg

    @Column({default: false})
    achieved: boolean;

    @Column({nullable: true})
    progress: number;

    @Column()
    createdAt: Date;

    @Column({type:'date', nullable: true})
    deadline: string;

    @ManyToOne(()=> User, user => user.goals)
    user: User;

    @OneToMany(() => Activity, activity => activity.goal)
    activities: Activity[];


}