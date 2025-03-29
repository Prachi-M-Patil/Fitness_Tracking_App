import { WorkoutService } from "../services/workoutService";
import { Request, Response } from "express";


export class workoutController{
    private workoutService: WorkoutService;

    constructor(){
        this.workoutService = new WorkoutService();

    }

    async logWorkout(req: Request, res: Response): Promise<void> {
        try {
            const {userId , workoutData}=req.body;
            const newWorkout = await this.workoutService.logWorkout(userId, workoutData);
            res.status(201).json(newWorkout);
        } catch (error) {
            res.status(500).json({ error: "Failed to log workout"});
        }
    }

    async getWorkouts(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.body; // Take userId from request body

            // Validate userId
            if (!userId || isNaN(userId)) {
                res.status(400).json({ error: "Invalid or missing userId in request body" });
                return;
            }

            const workouts = await this.workoutService.getWorkouts(userId);

            // If no workouts are found, return a 404 response
            if (workouts.length === 0) {
                res.status(404).json({ error: "No workouts found for the specified user" });
                return;
            }

            res.status(200).json(workouts);
        } catch (error) {
            console.error("Error in getWorkouts:", error);
            res.status(500).json({ error: "Failed to retrieve workouts" });
        }
    }
}