import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './workout.component';

const routes: Routes = [
  { path: 'logworkout', component: WorkoutComponent },
  { path: '', redirectTo: 'logworkout', pathMatch: 'full' }, // Redirect to workouts

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule {}
