import { getRepository } from "typeorm";
import { Meal } from "../entities/Meal";
import { mealRepository } from "../repositories/mealRepo";
import { userRepository } from "../repositories/UserRepo";
import { AppDataSource } from "../config/database";

export class MealService {
    async addMeal(mealData: Partial<Meal>): Promise<Meal> {
        const meal = mealRepository.create(mealData);
        return await mealRepository.save(meal);
    }

    async updateMeal(mealId: number, mealData: Partial<Meal>): Promise<Meal | null> {
        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!meal) {
            return null;
        }

        Object.assign(meal, mealData);
        const updatedMeal = await mealRepository.save(meal);
        return updatedMeal;
    }

    async deleteMeal(mealId: number): Promise<void> {
    //     console.log("method to delete meal");
    // const deleteResult = await mealRepository.delete(mealId);
    // if (!deleteResult.affected) {
    //     throw new Error(`Meal with ID ${mealId} not found or already deleted.`);
    // }
    // await AppDataSource.getRepository(User).createQueryBuilder()
    // .delete()
    // .where("mealsFtTrackerId = :id", { id: mealId })
    // .execute();

    // Delete the meal
    await AppDataSource.getRepository(Meal).createQueryBuilder()
    .delete()
    .where("id = :id", { id: mealId })
    .execute();
    }

    async getMealById(mealId: number): Promise<Meal | null> {
        return await mealRepository.findOne({ where: { id: mealId }, relations: ["users", "nutrition"] });
    }

    async getAllMeals(): Promise<Meal[]> {
        return await mealRepository.find({ relations: ["users", "nutrition"] });
    }

    async getUserMeals(userId: number): Promise<Meal[]> {
        return await mealRepository.find({ where: { users: { id: userId } }, relations: ["users"] });
    }

    async getUserLikedMeals(userId: number): Promise<Meal[]> {
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
        if (!user) {
            throw { status: 404, message: `User with ID ${userId} not found.` };
        }
        return user.meals.filter(meal => meal.liked);
    }
}
