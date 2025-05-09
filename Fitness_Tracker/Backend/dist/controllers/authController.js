"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const database_1 = require("../config/database");
const authService = new authService_1.AuthService(database_1.AppDataSource);
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, mobile, email, role } = req.body;
            try {
                const result = yield authService.register(username, password, mobile, email, role);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message || 'Registration failed' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, secretKey } = req.body;
            try {
                const result = yield authService.login(username, password);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message || 'Login failed' });
            }
        });
    }
}
exports.AuthController = AuthController;
