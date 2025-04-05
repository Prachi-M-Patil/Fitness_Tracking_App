import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Meal } from "./Meal";
import { User } from "./User";

@Entity({name: 'Nutrition_Ft_Tracker'})
export class Nutrition{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dailyCalories: number;

    @Column()
    dailyProtein: number;

    @Column()
    dailyCarbs: number;

    @Column()
    dailyFats: number;

    @ManyToOne(()=> Meal, meals=> meals.nutrition, { onDelete: "CASCADE" })
    meals: Meal[];

    @ManyToOne(() => User, user => user.nutrition)
    user: User;
    
}