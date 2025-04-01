import express from "express";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/authRoutes";
import cors from 'cors';
import profileRoutes from "./routes/profileRoutes";
import workoutRoute from "./routes/workoutRoute";
import goalRoutes from "./routes/goalRoutes";
import mealsRouter from "./routes/MealRoutes";
import nutritionrouter from "./routes/NutritionRoutes";


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/workout', workoutRoute);
app.use('/api/goals', goalRoutes);
app.use('/api/meals', mealsRouter);
app.use('api/nutritions', nutritionrouter);





AppDataSource.initialize()
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
