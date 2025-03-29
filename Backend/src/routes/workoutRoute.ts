import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { workoutController } from "../controllers/workoutController";

const router = Router();
const workoutcontroller = new workoutController();

router.post("/logworkout",authMiddleware(['admin', 'user']), (req, res) => workoutcontroller.logWorkout(req, res));
router.post("/getworkouts/",authMiddleware(['user', 'admin']), (req, res) => workoutcontroller.getWorkouts(req, res));

export default router;
