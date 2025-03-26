import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nutrition } from "./Nutrition";

@Entity({name: 'Meal_Ft_Tracker'})
export class Meal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    calories: number;

    @Column()
    Protein : number;

    @Column()
    carbs: number;

    @Column()
    fats: number;

    @ManyToOne(()=> Nutrition, nutrition => nutrition.meals)
    nutrition: Nutrition;
}