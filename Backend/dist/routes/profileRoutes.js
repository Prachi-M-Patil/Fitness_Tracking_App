"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
const profileController = new profileController_1.ProfileController();
router.post("/createprofile", (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => profileController.createProfile(req, res));
router.get("/profile/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.getProfile(req, res));
router.put("/profile/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.updateProfile(req, res)); // For updating profile
router.delete("/delete/:userId", (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => profileController.deleteProfile(req, res)); // For updating profile
exports.default = router;
