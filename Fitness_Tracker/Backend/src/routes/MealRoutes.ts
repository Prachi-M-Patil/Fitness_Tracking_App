import { Router } from 'express';
import { MealController } from '../controllers/MealController';
import { MealService } from '../services/MealService';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const mealService = new MealService();
const mealController = new MealController(mealService);

router.post('/',authMiddleware(['admin']), (req, res) => mealController.addMeal(req, res));
router.put('/:id',authMiddleware(['admin']), (req, res) => mealController.updateMeal(req, res));
router.delete('/:id',authMiddleware(['admin']), (req, res) => mealController.deleteMeal(req, res));
router.get('/:id',authMiddleware(['admin', 'user']), (req, res) => mealController.getMealById(req, res));
router.get('/',authMiddleware(['admin', 'user']), (req, res) => mealController.getAllMeals(req, res));
router.get('/user/:userId',authMiddleware(['admin', 'user']), (req, res) => mealController.getUserMeals(req, res));
router.get('/user/:userId/liked',authMiddleware(['admin', 'user']), (req, res) => mealController.getUserLikedMeals(req, res));

export default router;
