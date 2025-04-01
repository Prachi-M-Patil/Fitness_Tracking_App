"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MealController_1 = require("../controllers/MealController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const mealsRouter = (0, express_1.Router)();
const mealController = new MealController_1.MealController();
mealsRouter.post("/:userId", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.logMeal(req, res)); // Log a meal for a user
mealsRouter.get("/:userId", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getMeals(req, res)); // Get all meals logged by a user
mealsRouter.post("/createmeal", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => mealController.createMeal(req, res)); // Create a new meal (admin)
mealsRouter.put("/:mealId", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => mealController.updateMeal(req, res)); // Update an existing meal (admin)
mealsRouter.delete("/:userId/:mealId", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.deleteMeal(req, res)); // Delete a logged meal for a user
mealsRouter.get("/recommendations/:userId", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getMealRecommendations(req, res)); // Get recommended meals for a user
mealsRouter.get("/total", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getTotalMealsAvailable(req, res)); // Get total meals available
mealsRouter.post("/ratemeal", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => mealController.rateMeal(req, res));
exports.default = mealsRouter;
