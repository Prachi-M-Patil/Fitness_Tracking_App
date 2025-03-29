import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(()=> Meal, meal=> meal.nutrition)
    meals: Meal[];

    @OneToOne(() => User, user => user.nutrition)
    user: User;
    
}