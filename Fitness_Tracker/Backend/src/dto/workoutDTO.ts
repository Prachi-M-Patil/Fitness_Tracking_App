import { User } from "../entities/User";

export class workoutDTO{
    id: number;
    type: string;
    duration: number;
    caloriesBurned: number;
    user: User;
    date: Date;
    
}