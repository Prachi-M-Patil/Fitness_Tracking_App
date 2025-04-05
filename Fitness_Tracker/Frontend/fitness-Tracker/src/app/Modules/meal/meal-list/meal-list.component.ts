import { Component, OnInit } from '@angular/core';
import { Goal, GoalService } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';
import { Meal } from '../../../services/admin.service';
import { MealDTO, MealService } from '../../../services/meals.service';

@Component({
  selector: 'app-Meal-list',
  standalone: false,
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  meals: MealDTO[] = []; // Corrected to be an array of Meal objects
  userId: number;

  constructor(private  mealservice: MealService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.mealservice.getAllMeals().subscribe(data=>{
      this.meals =  data;
    });
    console.log("fetching meals");
  }

  getUserRole(): boolean{
    const role = this.authService.getUserRole();
    console.log(role);
    if(role=== 'admin'){
      return true;
    }
    return false;
  }

}