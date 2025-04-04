"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const AdminService_1 = require("../services/AdminService");
const router = (0, express_1.Router)();
const adminDashboardService = new AdminService_1.AdminDashboardService();
const adminDashboardController = new adminController_1.AdminDashboardController(adminDashboardService);
router.post("/users", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.addUser(req, res));
router.put("/users/:userId", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.updateUser(req, res));
router.delete("/users/:userId", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.deactivateUser(req, res));
router.get("/users", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.searchUsers(req, res));
router.get("/user/:userId/workouts", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.getUserWorkouts(req, res));
router.get("/user/:userId/goals", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.getUserGoals(req, res));
// router.get("/users/:userId/activities", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserActivities(req, res));
router.get("/user/:userId/meals", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.getUserMeals(req, res));
router.get("/user/:userId/liked-meals", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.getUserLikedMeals(req, res));
router.get("/deactivated-users", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.getDeactivatedUsers(req, res));
router.put("/activate-user/:userId", (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => adminDashboardController.activateUser(req, res));
exports.default = router;
