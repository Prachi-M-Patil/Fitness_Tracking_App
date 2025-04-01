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
exports.MealController = void 0;
const MealService_1 = require("../services/MealService");
class MealController {
    constructor() {
        this.mealService = new MealService_1.MealService();
    }
    //to log meals for specific user
    logMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const mealData = req.body;
                const loggedMeal = yield this.mealService.logMeal(userId, mealData);
                res.status(201).send(loggedMeal);
            }
            catch (error) {
                console.error("Error logging meal:", error);
                res.status(500).send({ message: "An error occurred while logging the meal.", error });
            }
        });
    }
    getMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const meals = yield this.mealService.getMeals(userId);
                res.status(200).json(meals);
            }
            catch (error) {
                console.error("Error fetching meals:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    //creates meal into system definition
    createMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealData = req.body;
                const createdMeal = yield this.mealService.createMeal(mealData);
                res.status(201).send(createdMeal);
            }
            catch (error) {
                console.error("Error creating meal:", error);
                res.status(500).send({ message: "An error occurred while creating the meal.", error });
            }
        });
    }
    updateMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.mealId);
                const mealData = req.body;
                const updatedMeal = yield this.mealService.updateMeal(mealId, mealData);
                if (!updatedMeal) {
                    res.status(404).json({ message: "Meal not found." });
                    return;
                }
                res.status(200).json(updatedMeal);
            }
            catch (error) {
                console.error("Error updating meal:", error);
                res.status(500).json({ message: "An error occurred while updating the meal.", error });
            }
        });
    }
    deleteMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const mealId = parseInt(req.params.mealId);
                yield this.mealService.deleteMeal(userId, mealId);
                res.status(200).json({ message: "Meal successfully deleted" });
            }
            catch (error) {
                console.error("Error deleting meal:", error);
                res.status(500).json({ error: "Failed to delete meal" });
            }
        });
    }
    getMealRecommendations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const recommendations = yield this.mealService.getMealRecommendations(userId);
                res.status(200).json(recommendations);
            }
            catch (error) {
                console.error("Error fetching meal recommendations:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getTotalMealsAvailable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalMeals = yield this.mealService.getTotalMealsAvailable();
                res.status(200).json({ totalMeals });
            }
            catch (error) {
                console.error("Error fetching total meals available:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    rateMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const mealId = parseInt(req.params.mealId);
                const { rating } = req.body;
                yield this.mealService.rateMeal(userId, mealId, rating);
                res.status(200).json({ message: "Meal rated successfully" });
            }
            catch (error) {
                console.error("Error rating meal:", error);
                res.status(500).json({ error: "Failed to rate meal" });
            }
        });
    }
}
exports.MealController = MealController;
