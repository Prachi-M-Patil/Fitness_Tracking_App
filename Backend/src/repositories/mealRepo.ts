import { AppDataSource } from "../config/database";
import { Meal } from "../entities/Meal";
import { Profile } from "../entities/Profile";

export const mealRepository = AppDataSource.getRepository(Meal);
