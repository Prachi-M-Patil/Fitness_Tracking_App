import { Component } from '@angular/core';
import { MealService, MealDTO } from '../../../services/meals.service';
@Component({
  selector: 'app-log-meal',
  standalone: false,
  templateUrl: './log-meal.component.html'
})
export class LogMealComponent {
  mealData: MealDTO = {};
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private mealService: MealService) {}

  logMeal() {
    this.mealService.logMeal(this.userId, this.mealData).subscribe(response => {
      console.log('Meal logged:', response);
    });
  }
}
