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
class MealController {
    constructor(mealService) {
        this.mealService = mealService;
    }
    addMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealData = req.body;
                const meal = yield this.mealService.addMeal(mealData);
                res.status(201).json(meal);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                const mealData = req.body;
                const meal = yield this.mealService.updateMeal(mealId, mealData);
                res.status(200).json(meal);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    deleteMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                yield this.mealService.deleteMeal(mealId);
                res.status(200).json({ message: 'Meal deleted successfully' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getMealById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                const meal = yield this.mealService.getMealById(mealId);
                res.status(200).json(meal);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getAllMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const meals = yield this.mealService.getAllMeals();
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const meals = yield this.mealService.getUserMeals(userId);
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserLikedMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const meals = yield this.mealService.getUserLikedMeals(userId);
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.MealController = MealController;
