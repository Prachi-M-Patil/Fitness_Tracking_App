import express from "express";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);



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
