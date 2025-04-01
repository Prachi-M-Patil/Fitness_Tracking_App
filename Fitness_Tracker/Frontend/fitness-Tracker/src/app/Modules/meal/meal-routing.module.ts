import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogMealComponent } from './log-meal/log-meal.component';
import { ViewMealsComponent } from './view-meal/view-meal.component';

const routes: Routes = [
  {
    path: 'log-meal', // Route for logging meals 
    component: LogMealComponent,
  },
  {
    path: 'view-meals', // Route to view a specific user's Meals
    component: ViewMealsComponent,
  },
  { path: '', component: ViewMealsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule {}
