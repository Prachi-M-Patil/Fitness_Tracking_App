import { Nutrition } from "../entities/Nutrition";
import { nutritionRepository } from "../repositories/NutritionRepo";

export class NutritionService {
    async addNutrition(nutritionData: Partial<Nutrition>): Promise<Nutrition> {
        const nutrition = nutritionRepository.create(nutritionData);
        return await nutritionRepository.save(nutrition);
    }

    async updateNutrition(nutritionId: number, nutritionData: Partial<Nutrition>): Promise<Nutrition | null> {
        const nutrition = await nutritionRepository.findOne({ where: { id: nutritionId } });

        if (!nutrition) {
            return null;
        }

        Object.assign(nutrition, nutritionData);
        const updatedNutrition = await nutritionRepository.save(nutrition);
        return updatedNutrition;
    }

    async deleteNutrition(nutritionId: number): Promise<void> {
        await nutritionRepository.delete(nutritionId);
    }

    async getNutritionById(nutritionId: number): Promise<Nutrition | null> {
        return await nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });
    }

    async getAllNutrition(): Promise<Nutrition[]> {
        return await nutritionRepository.find({ relations: ["meals", "user"] });
    }

    async getUserNutrition(userId: number): Promise<Nutrition[]> {
        return await nutritionRepository.find({ where: { user: { id: userId } }, relations: ["user"] });
    }
}
