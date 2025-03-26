import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Meal } from "./Meal";

@Entity({name: 'Nutrition_Ft_Tracker'})
export class Nutrition{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dailyCalorieIntake: number;

    @OneToMany(()=> Meal, meal=> meal.nutrition)
    meals: Meal[];
}