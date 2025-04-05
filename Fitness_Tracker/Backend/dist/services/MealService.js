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
const Meal_1 = require("../entities/Meal");
const mealRepo_1 = require("../repositories/mealRepo");
const UserRepo_1 = require("../repositories/UserRepo");
const database_1 = require("../config/database");
class MealService {
    addMeal(mealData) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = mealRepo_1.mealRepository.create(mealData);
            return yield mealRepo_1.mealRepository.save(meal);
        });
    }
    updateMeal(mealId, mealData) {
        return __awaiter(this, void 0, void 0, function* () {
            const meal = yield mealRepo_1.mealRepository.findOne({ where: { id: mealId } });
            if (!meal) {
                return null;
            }
            Object.assign(meal, mealData);
            const updatedMeal = yield mealRepo_1.mealRepository.save(meal);
            return updatedMeal;
        });
    }
    deleteMeal(mealId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield database_1.AppDataSource.getRepository(Meal_1.Meal).createQueryBuilder()
                .delete()
                .where("id = :id", { id: mealId })
                .execute();
        });
    }
    getMealById(mealId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mealRepo_1.mealRepository.findOne({ where: { id: mealId }, relations: ["users", "nutrition"] });
        });
    }
    getAllMeals() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mealRepo_1.mealRepository.find({ relations: ["users", "nutrition"] });
        });
    }
    getUserMeals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mealRepo_1.mealRepository.find({ where: { users: { id: userId } }, relations: ["users"] });
        });
    }
    getUserLikedMeals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
            if (!user) {
                throw { status: 404, message: `User with ID ${userId} not found.` };
            }
            return user.meals.filter(meal => meal.liked);
        });
    }
}
exports.MealService = MealService;
