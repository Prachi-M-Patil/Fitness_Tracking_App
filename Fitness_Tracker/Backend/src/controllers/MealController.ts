import { MealDTO } from "../dto/mealDTO";
import { Request, Response } from "express";
import { MealService } from "../services/MealService";

export class MealController {
    private mealService = new MealService();

    //to log meals for specific user
    async logMeal(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const mealData: MealDTO = req.body;
            const loggedMeal = await this.mealService.logMeal(userId, mealData);
            res.status(201).send(loggedMeal);
        } catch (error) {
            console.error("Error logging meal:", error);
            res.status(500).send({ message: "An error occurred while logging the meal.", error });
        }
    }


    async getMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const meals = await this.mealService.getMeals(userId);
            res.status(200).json(meals);
        } catch (error) {
            console.error("Error fetching meals:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    //creates meal into system definition
    async createMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealData: MealDTO = req.body;
            const createdMeal = await this.mealService.createMeal(mealData);
            res.status(201).send(createdMeal);
        } catch (error) {
            console.error("Error creating meal:", error);
            res.status(500).send({ message: "An error occurred while creating the meal.", error });
        }
    }

    async updateMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.mealId);
            const mealData: Partial<MealDTO> = req.body;
            const updatedMeal = await this.mealService.updateMeal(mealId, mealData);
            if (!updatedMeal) {
                res.status(404).json({ message: "Meal not found." });
                return;
            }
            res.status(200).json(updatedMeal);
        } catch (error) {
            console.error("Error updating meal:", error);
            res.status(500).json({ message: "An error occurred while updating the meal.", error });
        }
    }

    async deleteMeal(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const mealId = parseInt(req.params.mealId);
            await this.mealService.deleteMeal(userId, mealId);
            res.status(200).json({ message: "Meal successfully deleted" });
        } catch (error) {
            console.error("Error deleting meal:", error);
            res.status(500).json({ error: "Failed to delete meal" });
        }
    }

    async getMealRecommendations(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const recommendations = await this.mealService.getMealRecommendations(userId);
            res.status(200).json(recommendations);
        } catch (error) {
            console.error("Error fetching meal recommendations:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getTotalMealsAvailable(req: Request, res: Response): Promise<void> {
        try {
            const totalMeals = await this.mealService.getTotalMealsAvailable();
            res.status(200).json({ totalMeals });
        } catch (error) {
            console.error("Error fetching total meals available:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async rateMeal(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const mealId = parseInt(req.params.mealId);
            const { rating } = req.body;
            await this.mealService.rateMeal(userId, mealId, rating);
            res.status(200).json({ message: "Meal rated successfully" });
        } catch (error) {
            console.error("Error rating meal:", error);
            res.status(500).json({ error: "Failed to rate meal" });
        }
    }
    
}


