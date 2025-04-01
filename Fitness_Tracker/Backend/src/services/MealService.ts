import { MealDTO } from "../dto/mealDTO";
import { Meal } from "../entities/Meal";
import { mealRepository } from "../repositories/mealRepo";
import { userRepository } from "../repositories/UserRepo";
 


export class MealService {
    // Log a new meal for the user
    async logMeal(userId: number, mealData: MealDTO): Promise<MealDTO> {
        const meal = await mealRepository.create({ ...mealData, users: [{ id: userId }] });
        return await mealRepository.save(meal);
    }

    // Get all meals logged by the user
    async getMeals(userId: number): Promise<MealDTO[]> {
        const meals = await mealRepository.find({
            where: { users: { id: userId } },
            relations: ["users"],
        });

        console.log(meals); // Debugging
        return meals.map(({ id, name, calories, Protein, carbs, fats }) => ({
            id,
            name,
            calories,
            Protein,
            carbs,
            fats,
        }));
    }

    // Create a new meal (Admin only)
    async createMeal(mealData: MealDTO): Promise<MealDTO> {
        const meal = await mealRepository.create(mealData);
        return await mealRepository.save(meal);
    }

    // Update an existing meal (Admin only)
    async updateMeal(mealId: number, mealData: MealDTO): Promise<MealDTO> {
        const meal = await mealRepository.findOne({ where: { id: mealId } });
        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }
        Object.assign(meal, mealData);
        return await mealRepository.save(meal);
    }

    // Get recommended meals based on user nutrition goals
    async getMealRecommendations(userId: number): Promise<Meal[]> {
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ["nutrition", "meals"],
        });

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const { nutrition, meals } = user;

        if (!nutrition) {
            throw new Error(`Nutrition data not found for user with ID ${userId}.`);
        }

        const remainingCalories = nutrition.dailyCalories - meals.reduce((sum, meal) => sum + meal.calories, 0);
        const remainingProtein = nutrition.dailyProtein - meals.reduce((sum, meal) => sum + meal.Protein, 0);
        const remainingCarbs = nutrition.dailyCarbs - meals.reduce((sum, meal) => sum + meal.carbs, 0);
        const remainingFats = nutrition.dailyFats - meals.reduce((sum, meal) => sum + meal.fats, 0);

        const availableMeals = await mealRepository.find();
        return availableMeals.filter(meal =>
            meal.calories <= remainingCalories &&
            meal.Protein <= remainingProtein &&
            meal.carbs <= remainingCarbs &&
            meal.fats <= remainingFats
        );
    }

    // Rate a meal
    async rateMeal(userId: number, mealId: number, rating: number): Promise<void> {
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }

        // Placeholder for storing the rating (e.g., adding a rating field to the Meal entity)
        meal.rating = rating; // Assuming `rating` is a field in the Meal entity
        await mealRepository.save(meal);
    }

    // Delete a logged meal
    async deleteMeal(userId: number, mealId: number): Promise<void> {
        const meal = await mealRepository.findOne({ where: { id: mealId, users: { id: userId } }, relations: ["users"] });
        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found for user ID ${userId}.`);
        }
        await mealRepository.remove(meal);
    }

    // Get total number of meals available (Admin and User)
    async getTotalMealsAvailable(): Promise<number> {
        const count = await mealRepository.count();
        console.log(`Total meals available: ${count}`); // Debugging
        return count;
    }
}
