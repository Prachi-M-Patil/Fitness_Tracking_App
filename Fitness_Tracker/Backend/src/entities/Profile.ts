import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Profile_Ft_Tracker'})
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @OneToOne(()=> User, user => user.profile)
    user: User;
    
}

