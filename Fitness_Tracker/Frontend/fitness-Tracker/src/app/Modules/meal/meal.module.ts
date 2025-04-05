import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealRoutingModule } from './meal-routing.module';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealService } from '../../services/meals.service';
import { MealAddComponent } from './meal-add/meal-add.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealDeleteComponent } from './meal-delete/meal-delete.component';




@NgModule({
  declarations: [
     MealListComponent,
     MealDetailsComponent,
     MealAddComponent,
     MealEditComponent,
     MealDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MealRoutingModule
  ],
  exports:[
    MealListComponent,
    MealDetailsComponent,
    MealAddComponent,
    MealEditComponent,
    MealDeleteComponent
  ],
  providers:[
    MealService
  ]
})
export class MealModule { }
