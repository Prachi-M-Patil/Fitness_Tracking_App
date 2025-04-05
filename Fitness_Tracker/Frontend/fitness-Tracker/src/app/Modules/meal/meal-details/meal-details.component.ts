import { Component } from '@angular/core';
import { MealDTO, MealService } from '../../../services/meals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  standalone: false,
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})
export class MealDetailsComponent {
  meal!: MealDTO;

  constructor(private mealService: MealService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;// retrieve and convert the value of the id parameter from the URL into a number
    this.mealService.getMealById(id).subscribe(data => {
      this.meal = data;
    });
  }
}
