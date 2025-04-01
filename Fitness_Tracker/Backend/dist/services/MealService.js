"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealService = void 0;
const mealRepo_1 = require("../repositories/mealRepo");
const UserRepo_1 = require("../repositories/UserRepo");
class MealService {
    // Log a new meal for the user
    logMeal(userId, mealData) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield mealRepo_1.mealRepository.create(Object.assign(Object.assign({}, mealData), { users: [{ id: userId }] }));
            return yield mealRepo_1.mealRepository.save(meal);
        });
    }
    // Get all meals logged by the user
    getMeals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const meals = yield mealRepo_1.mealRepository.find({
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
        });
    }
    // Create a new meal (Admin only)
    createMeal(mealData) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield mealRepo_1.mealRepository.create(mealData);
            return yield mealRepo_1.mealRepository.save(meal);
        });
    }
    // Update an existing meal (Admin only)
    updateMeal(mealId, mealData) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield mealRepo_1.mealRepository.findOne({ where: { id: mealId } });
            if (!meal) {
                throw new Error(`Meal with ID ${mealId} not found.`);
            }
            Object.assign(meal, mealData);
            return yield mealRepo_1.mealRepository.save(meal);
        });
    }
    // Get recommended meals based on user nutrition goals
    getMealRecommendations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({
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
            const availableMeals = yield mealRepo_1.mealRepository.find();
            return availableMeals.filter(meal => meal.calories <= remainingCalories &&
                meal.Protein <= remainingProtein &&
                meal.carbs <= remainingCarbs &&
                meal.fats <= remainingFats);
        });
    }
    // Rate a meal
    rateMeal(userId, mealId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
            const meal = yield mealRepo_1.mealRepository.findOne({ where: { id: mealId } });
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }
            if (!meal) {
                throw new Error(`Meal with ID ${mealId} not found.`);
            }
            // Placeholder for storing the rating (e.g., adding a rating field to the Meal entity)
            meal.rating = rating; // Assuming `rating` is a field in the Meal entity
            yield mealRepo_1.mealRepository.save(meal);
        });
    }
    // Delete a logged meal
    deleteMeal(userId, mealId) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield mealRepo_1.mealRepository.findOne({ where: { id: mealId, users: { id: userId } }, relations: ["users"] });
            if (!meal) {
                throw new Error(`Meal with ID ${mealId} not found for user ID ${userId}.`);
            }
            yield mealRepo_1.mealRepository.remove(meal);
        });
    }
    // Get total number of meals available (Admin and User)
    getTotalMealsAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield mealRepo_1.mealRepository.count();
            console.log(`Total meals available: ${count}`); // Debugging
            return count;
        });
    }
}
exports.MealService = MealService;
