import { Request, Response } from 'express';
import { NutritionService } from '../services/nutritionService';
import { Nutrition } from '../entities/Nutrition';

export class NutritionController {
    private nutritionService: NutritionService;

    constructor(nutritionService: NutritionService) {
        this.nutritionService = nutritionService;
    }

    async addNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionData: Partial<Nutrition> = req.body;
            const nutrition = await this.nutritionService.addNutrition(nutritionData);
            res.status(201).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async updateNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            const nutritionData: Partial<Nutrition> = req.body;
            const nutrition = await this.nutritionService.updateNutrition(nutritionId, nutritionData);
            res.status(200).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async deleteNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            await this.nutritionService.deleteNutrition(nutritionId);
            res.status(200).json({ message: 'Nutrition deleted successfully' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getNutritionById(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            const nutrition = await this.nutritionService.getNutritionById(nutritionId);
            res.status(200).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getAllNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutrition = await this.nutritionService.getAllNutrition();
            res.status(200).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getUserNutrition(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const nutrition = await this.nutritionService.getUserNutrition(userId);
            res.status(200).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}
