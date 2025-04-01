import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to Login by default
  {
    path: 'profile', // Lazy load the ProfileModule
    loadChildren: () => import('./Modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'workout', // Lazy load the workoutModule
    loadChildren: () => import('./Modules/workout/workout.module').then(m => m.WorkoutModule)
  },
  { path: 'goal', loadChildren: () => import('./Modules/goal/goal.module').then(m => m.GoalModule) },
  
  {path: 'meal', loadChildren:()=> import('./Modules/meal/meal.module').then(m=> m.MealModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
