import { GoalDTO } from "../dto/goalDTO";
import { Goal } from "../entities/Goal";
import { goalRepository } from "../repositories/GoalRepo";

export class goalService {
    // Create a new goal for a specific user
    async createGoal(userId: number, goalData: GoalDTO): Promise<Goal> {
        // Validate the input data
        if (!userId || !goalData.name || !goalData.target) {
            throw new Error("Missing required fields: userId, name, or target");
        }

        // Create a new goal entity using the provided data
        const newGoal = goalRepository.create({
            goalType: goalData.name,
            target: `${goalData.target}`, // Convert target to a string
            deadline: goalData.deadline || null,
            progress: goalData.progress || 0,
            createdAt: new Date(),
            user: { id: userId } // Assuming user relation is set by id
        });

        // Save the new goal to the database
        const savedGoal = await goalRepository.save(newGoal);

        // Return the saved goal entity
        return savedGoal;
    }

    // Get all goals for a specific user
    async getGoals(userId: number): Promise<Goal[]> {
        const goals = await goalRepository.find({
            where: { user: { id: userId } },
        });

        return goals;
    }


    // Update progress or mark goal as achieved
    async updateGoal(goalId: number, progress: number, achieved: boolean): Promise<Goal> {
        const goal = await goalRepository.findOneBy({ id: goalId });

        if (!goal) {
            throw new Error(`Goal with id ${goalId} not found`);
        }

        goal.progress = progress;
        goal.achieved = achieved;

        const updatedGoal = await goalRepository.save(goal);
        return updatedGoal;
    }

    async deleteGoal(goalId: number): Promise<boolean> {
        const goal = await goalRepository.findOneBy({ id: goalId });

        if (!goal) {
            // throw new Error(`Goal with id ${goalId} not found`);
            return false;
        }

        await goalRepository.delete(goalId);
        return true;
    }
}
