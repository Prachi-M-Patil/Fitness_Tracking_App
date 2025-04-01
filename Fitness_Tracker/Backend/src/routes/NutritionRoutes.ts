import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { NutritionController } from "../controllers/nutritionController";

const nutritionrouter = Router();
const nutritionController = new NutritionController();

nutritionrouter.post("/createNutrition",authMiddleware(['admin', 'user']), (req, res) => nutritionController.createOrUpdateNutrition(req, res));
nutritionrouter.get("/getNutrition",authMiddleware(['user', 'admin']), (req, res) => nutritionController.getNutrition(req, res));
nutritionrouter.get("/getAllNutritions",authMiddleware(['user', 'admin']), (req, res) => nutritionController.getAllNutrition(req, res)); // For updating profile
nutritionrouter.delete("/deleteNutrition",authMiddleware(['user', 'admin']), (req, res) => nutritionController.deleteNutrition(req, res)); // For updating profile

export default nutritionrouter;
