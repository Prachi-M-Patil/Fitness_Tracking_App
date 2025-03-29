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
exports.WorkoutService = void 0;
const WorkoutRepo_1 = require("../repositories/WorkoutRepo");
class WorkoutService {
    logWorkout(userId, workoutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const workout = yield WorkoutRepo_1.workoutRepository.create(Object.assign(Object.assign({}, workoutData), { user: { id: userId } }));
            return yield WorkoutRepo_1.workoutRepository.save(workout);
        });
    }
    getWorkouts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workouts = yield WorkoutRepo_1.workoutRepository.find({
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
        });
    }
}
exports.WorkoutService = WorkoutService;
