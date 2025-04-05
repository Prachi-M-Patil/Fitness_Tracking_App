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
exports.NutritionController = void 0;
class NutritionController {
    constructor(nutritionService) {
        this.nutritionService = nutritionService;
    }
    addNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionData = req.body;
                const nutrition = yield this.nutritionService.addNutrition(nutritionData);
                res.status(201).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                const nutritionData = req.body;
                const nutrition = yield this.nutritionService.updateNutrition(nutritionId, nutritionData);
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    deleteNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                yield this.nutritionService.deleteNutrition(nutritionId);
                res.status(200).json({ message: 'Nutrition deleted successfully' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getNutritionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                const nutrition = yield this.nutritionService.getNutritionById(nutritionId);
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getAllNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutrition = yield this.nutritionService.getAllNutrition();
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const nutrition = yield this.nutritionService.getUserNutrition(userId);
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.NutritionController = NutritionController;
