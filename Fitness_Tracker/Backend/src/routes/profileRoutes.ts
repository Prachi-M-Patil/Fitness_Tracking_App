import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const profileController = new ProfileController();

router.post("/createprofile",authMiddleware(['admin', 'user']), (req, res) => profileController.createProfile(req, res));
router.get("/profile/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.getProfile(req, res));
router.put("/profile/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.updateProfile(req, res)); // For updating profile
router.delete("/delete/:userId",authMiddleware(['user', 'admin']), (req, res) => profileController.deleteProfile(req, res)); // For updating profile

export default router;
