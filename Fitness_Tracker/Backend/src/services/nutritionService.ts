import { NutritionDTO } from "../dto/nutritionDTO";
import { Nutrition } from "../entities/Nutrition";
import { nutritionRepository } from "../repositories/NutritionRepo";
import { userRepository } from "../repositories/UserRepo";

export class NutritionService {
    // Create or Update Nutrition for a User
    async createOrUpdateNutrition(userId: number, nutritionData: NutritionDTO): Promise<Nutrition> {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        let nutrition = await nutritionRepository.findOne({ where: { user: { id: userId } } });
        if (nutrition) {
            // Update existing nutrition data
            Object.assign(nutrition, nutritionData);
        } else {
            // Create new nutrition data
            nutrition = nutritionRepository.create({ ...nutritionData, user });
        }
        return await nutritionRepository.save(nutrition);
    }

    // Get Nutrition for a User
    async getNutrition(userId: number): Promise<Nutrition> {
        const nutrition = await nutritionRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        if (!nutrition) {
            throw new Error(`Nutrition data not found for user with ID ${userId}.`);
        }

        return nutrition;
    }

    // Delete Nutrition for a User
    async deleteNutrition(userId: number): Promise<void> {
        const nutrition = await nutritionRepository.findOne({ where: { user: { id: userId } } });
        if (!nutrition) {
            throw new Error(`Nutrition data not found for user with ID ${userId}.`);
        }

        await nutritionRepository.remove(nutrition);
    }

    // Get All Nutrition Records (Admin only)
    async getAllNutrition(): Promise<Nutrition[]> {
        return await nutritionRepository.find({ relations: ['user'] });
    }
}
