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
const nutritionService_1 = require("../services/nutritionService");
class NutritionController {
    constructor() {
        this.nutritionService = new nutritionService_1.NutritionService();
    }
    createOrUpdateNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const nutritionData = req.body;
                const createdNutrition = yield this.nutritionService.createOrUpdateNutrition(userId, nutritionData);
                res.status(201).send(createdNutrition);
            }
            catch (error) {
                console.error("Error creating or updating nutrition:", error);
                res.status(500).send({ message: "An error occurred while creating or updating nutrition.", error });
            }
        });
    }
    getNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const nutrition = yield this.nutritionService.getNutrition(userId);
                if (!nutrition) {
                    res.status(404).json({ message: "Nutrition not found" });
                    return;
                }
                res.status(200).json(nutrition);
            }
            catch (error) {
                console.error("Error fetching nutrition:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    deleteNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                yield this.nutritionService.deleteNutrition(userId);
                res.status(200).json({ message: "Nutrition successfully deleted" });
            }
            catch (error) {
                console.error("Error deleting nutrition:", error);
                res.status(500).json({ error: "Failed to delete nutrition" });
            }
        });
    }
    //for admin
    getAllNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allNutrition = yield this.nutritionService.getAllNutrition();
                res.status(200).json(allNutrition);
            }
            catch (error) {
                console.error("Error fetching all nutrition records:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.NutritionController = NutritionController;
