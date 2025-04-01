import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoalRoutingModule } from './goal-routing.module';
import { GoalService } from '../../services/goal.service';
import { AuthService } from '../../services/auth.service';



@NgModule({
  declarations: [
    GoalListComponent,
    GoalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    GoalRoutingModule

  ],
  exports:[
    GoalListComponent,
    GoalFormComponent
  ],
  providers:[
    GoalService, AuthService
  ]
})
export class GoalModule { }
