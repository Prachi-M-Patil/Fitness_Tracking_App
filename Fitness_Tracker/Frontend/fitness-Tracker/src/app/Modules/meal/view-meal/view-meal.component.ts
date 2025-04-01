import { Component, OnInit } from '@angular/core';
import { MealService, MealDTO } from '../../../services/meals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-meals',
  standalone: false,
  templateUrl: './view-meal.component.html'
})
export class ViewMealsComponent implements OnInit {
  meals: MealDTO[] = [];
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private mealService: MealService, private router: Router) {}

  ngOnInit() {
    this.getMeals();
  }

  getMeals() {
    this.mealService.getMeals(this.userId).subscribe(response => {
      this.meals = response;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
