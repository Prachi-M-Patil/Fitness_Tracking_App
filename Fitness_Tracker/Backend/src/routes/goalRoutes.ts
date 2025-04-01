import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { workoutController } from "../controllers/workoutController";
import { GoalController } from "../controllers/goalController";
const router = Router();
const goalcontroller = new GoalController();

router.post("/createGoal",authMiddleware(['admin', 'user']), (req, res) => goalcontroller.createGoal(req, res));
router.get("/getgoals",authMiddleware(['user', 'admin']), (req, res) => goalcontroller.getGoals(req, res));
router.put("/updateGoal",authMiddleware(['user', 'admin']), (req, res) => goalcontroller.updateGoal(req, res));
router.delete('/goals/:goalId', (req, res) => goalcontroller.deleteGoal(req, res));
export default router;
