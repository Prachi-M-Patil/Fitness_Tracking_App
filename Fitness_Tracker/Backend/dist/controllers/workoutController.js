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
exports.workoutController = void 0;
const workoutService_1 = require("../services/workoutService");
class workoutController {
    constructor() {
        this.workoutService = new workoutService_1.WorkoutService();
    }
    logWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, workoutData } = req.body;
                const newWorkout = yield this.workoutService.logWorkout(userId, workoutData);
                res.status(201).json(newWorkout);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to log workout" });
            }
        });
    }
    getWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body; // Take userId from request body
                // Validate userId
                if (!userId || isNaN(userId)) {
                    res.status(400).json({ error: "Invalid or missing userId in request body" });
                    return;
                }
                const workouts = yield this.workoutService.getWorkouts(userId);
                // If no workouts are found, return a 404 response
                if (workouts.length === 0) {
                    res.status(404).json({ error: "No workouts found for the specified user" });
                    return;
                }
                res.status(200).json(workouts);
            }
            catch (error) {
                console.error("Error in getWorkouts:", error);
                res.status(500).json({ error: "Failed to retrieve workouts" });
            }
        });
    }
    editWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                const workoutData = req.body;
                const updatedWorkout = yield this.workoutService.editWorkout(userId, workoutData);
                if (!updatedWorkout) {
                    res.status(404).json({ message: "Workout not found." });
                    return;
                }
                console.log("Workout updated");
                res.status(200).json(updatedWorkout);
            }
            catch (error) {
                console.error("Error updating workout:", error);
                res.status(500).json({ message: "An error occurred while updating the workout.", error });
            }
        });
    }
}
exports.workoutController = workoutController;
