import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealRoutingModule } from './meal-routing.module';
import { ViewMealsComponent } from './view-meal/view-meal.component';
import { LogMealComponent } from './log-meal/log-meal.component';



@NgModule({
  declarations: [
    ViewMealsComponent,
    LogMealComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MealRoutingModule
  ],
  exports:[
    ViewMealsComponent,
    LogMealComponent
  ]
})
export class MealModule { }
