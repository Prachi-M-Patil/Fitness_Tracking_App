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
class NutritionService {
    addNutrition(nutritionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = NutritionRepo_1.nutritionRepository.create(nutritionData);
            return yield NutritionRepo_1.nutritionRepository.save(nutrition);
        });
    }
    updateNutrition(nutritionId, nutritionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = yield NutritionRepo_1.nutritionRepository.findOne({ where: { id: nutritionId } });
            if (!nutrition) {
                return null;
            }
            Object.assign(nutrition, nutritionData);
            const updatedNutrition = yield NutritionRepo_1.nutritionRepository.save(nutrition);
            return updatedNutrition;
        });
    }
    deleteNutrition(nutritionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NutritionRepo_1.nutritionRepository.delete(nutritionId);
        });
    }
    getNutritionById(nutritionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });
        });
    }
    getAllNutrition() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.find({ relations: ["meals", "user"] });
        });
    }
    getUserNutrition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.find({ where: { user: { id: userId } }, relations: ["user"] });
        });
    }
}
exports.NutritionService = NutritionService;
