import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
const routes: Routes = [
  {
    path: 'profile', // Route for profile management
    component: ProfileComponent,
  },
  {
    path: 'profile/:userId', // Route to view a specific user's profile
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
