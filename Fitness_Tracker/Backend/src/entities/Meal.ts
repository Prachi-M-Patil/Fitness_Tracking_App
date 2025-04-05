import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nutrition } from "./Nutrition";
import { User } from "./User";

@Entity({name: 'Meal_Ft_Tracker'})
export class Meal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    mealtype: string; //breakfast, lunch, dinner

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
    
    @Column({ default: false })
    liked: boolean;
    

    @Column({ default: true })
    available: boolean;

    @OneToMany(()=> Nutrition, nutrition => nutrition.meals)
    nutrition: Nutrition;

    @ManyToOne(() => User, users => users.meals, {onDelete: "CASCADE"})
    // @JoinColumn()// Creates the join table for the relationship
    users: User;
    
}
