import { Request, Response } from 'express';
import { MealService } from '../services/MealService';
import { Meal } from '../entities/Meal';

export class MealController {
    private mealService: MealService;

    constructor(mealService: MealService) {
        this.mealService = mealService;
    }

    async addMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealData: Partial<Meal> = req.body;
            const meal = await this.mealService.addMeal(mealData);
            res.status(201).json(meal);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async updateMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            const mealData: Partial<Meal> = req.body;
            const meal = await this.mealService.updateMeal(mealId, mealData);
            res.status(200).json(meal);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async deleteMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            await this.mealService.deleteMeal(mealId);
            res.status(200).json({ message: 'Meal deleted successfully' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getMealById(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            const meal = await this.mealService.getMealById(mealId);
            res.status(200).json(meal);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getAllMeals(req: Request, res: Response): Promise<void> {
        try {
            const meals = await this.mealService.getAllMeals();
            res.status(200).json(meals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getUserMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const meals = await this.mealService.getUserMeals(userId);
            res.status(200).json(meals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getUserLikedMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const meals = await this.mealService.getUserLikedMeals(userId);
            res.status(200).json(meals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}
