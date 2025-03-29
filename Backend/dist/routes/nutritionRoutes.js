"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const nutritionController_1 = require("../controllers/nutritionController");
const nutritionrouter = (0, express_1.Router)();
const nutritionController = new nutritionController_1.NutritionController();
nutritionrouter.post("/createNutrition", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => nutritionController.createOrUpdateNutrition(req, res));
nutritionrouter.get("/getNutrition", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => nutritionController.getNutrition(req, res));
nutritionrouter.get("/getAllNutritions", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => nutritionController.getAllNutrition(req, res)); // For updating profile
nutritionrouter.delete("/deleteNutrition", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => nutritionController.deleteNutrition(req, res)); // For updating profile
exports.default = nutritionrouter;
