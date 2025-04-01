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
exports.GoalController = void 0;
const goalService_1 = require("../services/goalService");
class GoalController {
    constructor() {
        this.goalService = new goalService_1.goalService();
    }
    // Create a new goal
    createGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, goalData } = req.body;
                // Validate input
                if (!userId || !goalData || !goalData.name || !goalData.target) {
                    res.status(400).json({ error: "Missing required fields: userId, name, or target" });
                    return;
                }
                const newGoal = yield this.goalService.createGoal(userId, goalData);
                res.status(201).json(newGoal);
            }
            catch (error) {
                console.error("Error in createGoal:", error);
                res.status(500).json({ error: "Failed to create a new goal" });
            }
        });
    }
    // Get all goals for a specific user
    getGoals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.query.userId);
                // Validate userId
                if (!userId || isNaN(userId)) {
                    res.status(400).json({ error: "Invalid or missing userId in request query" });
                    return;
                }
                const goals = yield this.goalService.getGoals(userId);
                // If no goals are found
                if (goals.length === 0) {
                    res.status(404).json({ error: "No goals found for the specified user" });
                    return;
                }
                res.status(200).json(goals);
            }
            catch (error) {
                console.error("Error in getGoals:", error);
                res.status(500).json({ error: "Failed to retrieve goals" });
            }
        });
    }
    // Update progress or mark a goal as achieved
    updateGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { goalId, progress, achieved } = req.body;
                // Validate input
                if (!goalId || isNaN(goalId)) {
                    res.status(400).json({ error: "Invalid or missing goalId" });
                    return;
                }
                if (progress == null || achieved == null) {
                    res.status(400).json({ error: "Missing required fields: progress or achieved" });
                    return;
                }
                const updatedGoal = yield this.goalService.updateGoal(goalId, progress, achieved);
                res.status(200).json(updatedGoal);
            }
            catch (error) {
                console.error("Error in updateGoal:", error);
                res.status(500).json({ error: "Failed to update goal" });
            }
        });
    }
    deleteGoal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const goalId = parseInt(req.params.goalId);
                // Validate goalId
                if (!goalId || isNaN(goalId)) {
                    res.status(400).json({ error: "Invalid or missing goalId in request parameters" });
                    return;
                }
                const isDeleted = yield this.goalService.deleteGoal(goalId);
                if (!isDeleted) {
                    res.status(404).json({ message: "Goal not found" });
                }
                else {
                    res.status(200).json({ message: "Goal successfully deleted" });
                }
            }
            catch (error) {
                console.error("Error in deleteGoal:", error);
                res.status(500).json({ error: "Failed to delete goal" });
            }
        });
    }
}
exports.GoalController = GoalController;
