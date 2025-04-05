import { workoutDTO } from "../dto/workoutDTO";
import { Workout } from "../entities/Workout";
import { workoutRepository } from "../repositories/WorkoutRepo";

export class WorkoutService{
    async logWorkout(userId: number, workoutData: workoutDTO): Promise<Workout>{
        
        const workout = await workoutRepository.create({...workoutData, user:{id: userId}});
        return await workoutRepository.save(workout);
    }


    async getWorkouts(userId: number){
        const workouts = await workoutRepository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        });
        
        console.log(workouts); // debugging
        return workouts.map(({ id, type, duration, date, caloriesBurned }) => ({
            id,
            type,
            duration,
            date,
            caloriesBurned
        }));
    }

    async deleteWorkout(workoutId: number): Promise<void> {
        await workoutRepository.delete(workoutId);
    }

    async editWorkout(workoutId: number, workoutData:Partial<workoutDTO>): Promise<Workout>{
        const { id, ...updateData } = workoutData;
        await workoutRepository.update(workoutId, updateData);
        return await workoutRepository.findOneBy({ id: workoutId });

    }
        
    
    async getAllWorkouts(): Promise<Workout[]> {
        return await workoutRepository.find({ relations: ["user"] });
    }

}