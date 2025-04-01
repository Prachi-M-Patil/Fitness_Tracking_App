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
exports.goalService = void 0;
const GoalRepo_1 = require("../repositories/GoalRepo");
class goalService {
    // Create a new goal for a specific user
    createGoal(userId, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the input data
            if (!userId || !goalData.name || !goalData.target) {
                throw new Error("Missing required fields: userId, name, or target");
            }
            // Create a new goal entity using the provided data
            const newGoal = GoalRepo_1.goalRepository.create({
                goalType: goalData.name,
                target: `${goalData.target}`, // Convert target to a string
                deadline: goalData.deadline || null,
                progress: goalData.progress || 0,
                createdAt: new Date(),
                user: { id: userId } // Assuming user relation is set by id
            });
            // Save the new goal to the database
            const savedGoal = yield GoalRepo_1.goalRepository.save(newGoal);
            // Return the saved goal entity
            return savedGoal;
        });
    }
    // Get all goals for a specific user
    getGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield GoalRepo_1.goalRepository.find({
                where: { user: { id: userId } },
            });
            return goals;
        });
    }
    // Update progress or mark goal as achieved
    updateGoal(goalId, progress, achieved) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield GoalRepo_1.goalRepository.findOneBy({ id: goalId });
            if (!goal) {
                throw new Error(`Goal with id ${goalId} not found`);
            }
            goal.progress = progress;
            goal.achieved = achieved;
            const updatedGoal = yield GoalRepo_1.goalRepository.save(goal);
            return updatedGoal;
        });
    }
    deleteGoal(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield GoalRepo_1.goalRepository.findOneBy({ id: goalId });
            if (!goal) {
                // throw new Error(`Goal with id ${goalId} not found`);
                return false;
            }
            yield GoalRepo_1.goalRepository.delete(goalId);
            return true;
        });
    }
}
exports.goalService = goalService;
