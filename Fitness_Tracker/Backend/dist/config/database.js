"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entities/User");
const Profile_1 = require("../entities/Profile");
const Workout_1 = require("../entities/Workout");
const Goal_1 = require("../entities/Goal");
const Activity_1 = require("../entities/Activity");
const Exercise_1 = require("../entities/Exercise");
const Friends_1 = require("../entities/Friends");
const LeaderBoard_1 = require("../entities/LeaderBoard");
const Meal_1 = require("../entities/Meal");
const Nutrition_1 = require("../entities/Nutrition");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User_1.User, Profile_1.Profile, Workout_1.Workout, Goal_1.Goal, Activity_1.Activity, Exercise_1.Exercise, Friends_1.Friends, LeaderBoard_1.Leaderboard, Meal_1.Meal, Nutrition_1.Nutrition],
    logging: true,
    synchronize: true, // Ensure this is 'false' in production  process.env.NODE_ENV === "development",
    options: {
        trustServerCertificate: true,
    },
});
