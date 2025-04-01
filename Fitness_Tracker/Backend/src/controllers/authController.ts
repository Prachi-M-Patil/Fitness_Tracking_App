import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { AppDataSource } from "../config/database";

const authService = new AuthService(AppDataSource);

export class AuthController {
    static async register(req: Request, res: Response) {
        const { username, password, mobile, email, role } = req.body;

        try {
            const result = await authService.register(username, password, mobile, email, role);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message || 'Registration failed' });
        }
    }

    static async login(req: Request, res: Response) {
        const { username, password, secretKey } = req.body;

        try {
            const result = await authService.login(username, password);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message || 'Login failed' });
        }
    }
}
