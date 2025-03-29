import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nutrition } from "./Nutrition";
import { User } from "./User";

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

    @Column()
    rating: number;    

    @ManyToOne(()=> Nutrition, nutrition => nutrition.meals)
    nutrition: Nutrition;

    @ManyToMany(() => User, users => users.meals, { cascade: true })
    @JoinTable() // Creates the join table for the relationship
    users: User[];

}
