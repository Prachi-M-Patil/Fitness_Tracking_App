"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const workoutRoute_1 = __importDefault(require("./routes/workoutRoute"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const MealRoutes_1 = __importDefault(require("./routes/MealRoutes"));
const NutritionRoutes_1 = __importDefault(require("./routes/NutritionRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/profile', profileRoutes_1.default);
app.use('/api/workout', workoutRoute_1.default);
app.use('/api/goals', goalRoutes_1.default);
app.use('/api/meals', MealRoutes_1.default);
app.use('api/nutritions', NutritionRoutes_1.default);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initialized");
})
    .catch((err) => {
    console.error("Error initializing Data Source", err);
});
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
