import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  exports:[
    DashboardComponent,
    AdminDashboardComponent,
    UserDashboardComponent
  ]
})
export class DashboardModule { }
