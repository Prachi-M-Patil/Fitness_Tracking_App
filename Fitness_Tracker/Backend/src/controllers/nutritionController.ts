import { NutritionDTO } from "../dto/nutritionDTO";
import { NutritionService } from "../services/nutritionService";
import { Request, Response } from "express";

export class NutritionController {
    private nutritionService = new NutritionService();

    async createOrUpdateNutrition(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const nutritionData: NutritionDTO = req.body;
            const createdNutrition = await this.nutritionService.createOrUpdateNutrition(userId, nutritionData);
            res.status(201).send(createdNutrition);
        } catch (error) {
            console.error("Error creating or updating nutrition:", error);
            res.status(500).send({ message: "An error occurred while creating or updating nutrition.", error });
        }
    }

    async getNutrition(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            const nutrition = await this.nutritionService.getNutrition(userId);
            if (!nutrition) {
                res.status(404).json({ message: "Nutrition not found" });
                return;
            }
            res.status(200).json(nutrition);
        } catch (error) {
            console.error("Error fetching nutrition:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteNutrition(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            await this.nutritionService.deleteNutrition(userId);
            res.status(200).json({ message: "Nutrition successfully deleted" });
        } catch (error) {
            console.error("Error deleting nutrition:", error);
            res.status(500).json({ error: "Failed to delete nutrition" });
        }
    }

    //for admin
    async getAllNutrition(req: Request, res: Response): Promise<void> {
        try {
            const allNutrition = await this.nutritionService.getAllNutrition();
            res.status(200).json(allNutrition);
        } catch (error) {
            console.error("Error fetching all nutrition records:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
