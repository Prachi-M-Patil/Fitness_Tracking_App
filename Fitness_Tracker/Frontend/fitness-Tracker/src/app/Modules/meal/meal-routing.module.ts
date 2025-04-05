import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealAddComponent } from './meal-add/meal-add.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealDeleteComponent } from './meal-delete/meal-delete.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';


const routes: Routes = [
  {
    path: 'meal-list', // Route for logging meals 
    component: MealListComponent,
  },
  {
    path: 'add-meal',  
    component: MealAddComponent,
  },
  {path: 'meal-details/:id', component: MealDetailsComponent},
  { path: 'meal-edit/:id', component: MealEditComponent },
  { path: 'meal-delete/:id', component: MealDeleteComponent},
  {path:'', component: MealAddComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule {}
