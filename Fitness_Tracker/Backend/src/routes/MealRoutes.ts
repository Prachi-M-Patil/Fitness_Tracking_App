import { Router } from "express";
import { MealController } from "../controllers/MealController";
import { authMiddleware } from "../middlewares/authMiddleware";

const mealsRouter = Router();
const mealController = new MealController();

mealsRouter.post("/:userId",authMiddleware(['admin', 'user']), (req, res) => mealController.logMeal(req, res)); // Log a meal for a user
mealsRouter.get("/:userId",authMiddleware(['admin', 'user']), (req, res) => mealController.getMeals(req, res)); // Get all meals logged by a user
mealsRouter.post("/createmeal",authMiddleware(['admin']), (req, res) => mealController.createMeal(req, res)); // Create a new meal (admin)
mealsRouter.put("/:mealId",authMiddleware(['admin']), (req, res) => mealController.updateMeal(req, res)); // Update an existing meal (admin)
mealsRouter.delete("/:userId/:mealId",authMiddleware(['admin', 'user']), (req, res) => mealController.deleteMeal(req, res)); // Delete a logged meal for a user
mealsRouter.get("/recommendations/:userId",authMiddleware(['admin', 'user']), (req, res) => mealController.getMealRecommendations(req, res)); // Get recommended meals for a user
mealsRouter.get("/total",authMiddleware(['admin', 'user']), (req, res) => mealController.getTotalMealsAvailable(req, res)); // Get total meals available
mealsRouter.post("/ratemeal", authMiddleware(['user', 'admin']), (req, res)=> mealController.rateMeal(req,res));

export default mealsRouter;
