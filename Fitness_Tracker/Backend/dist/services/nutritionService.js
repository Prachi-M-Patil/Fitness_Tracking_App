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
exports.NutritionService = void 0;
const NutritionRepo_1 = require("../repositories/NutritionRepo");
const UserRepo_1 = require("../repositories/UserRepo");
class NutritionService {
    // Create or Update Nutrition for a User
    createOrUpdateNutrition(userId, nutritionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }
            let nutrition = yield NutritionRepo_1.nutritionRepository.findOne({ where: { user: { id: userId } } });
            if (nutrition) {
                // Update existing nutrition data
                Object.assign(nutrition, nutritionData);
            }
            else {
                // Create new nutrition data
                nutrition = NutritionRepo_1.nutritionRepository.create(Object.assign(Object.assign({}, nutritionData), { user }));
            }
            return yield NutritionRepo_1.nutritionRepository.save(nutrition);
        });
    }
    // Get Nutrition for a User
    getNutrition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = yield NutritionRepo_1.nutritionRepository.findOne({
                where: { user: { id: userId } },
                relations: ['user'],
            });
            if (!nutrition) {
                throw new Error(`Nutrition data not found for user with ID ${userId}.`);
            }
            return nutrition;
        });
    }
    // Delete Nutrition for a User
    deleteNutrition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = yield NutritionRepo_1.nutritionRepository.findOne({ where: { user: { id: userId } } });
            if (!nutrition) {
                throw new Error(`Nutrition data not found for user with ID ${userId}.`);
            }
            yield NutritionRepo_1.nutritionRepository.remove(nutrition);
        });
    }
    // Get All Nutrition Records (Admin only)
    getAllNutrition() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.find({ relations: ['user'] });
        });
    }
}
exports.NutritionService = NutritionService;
