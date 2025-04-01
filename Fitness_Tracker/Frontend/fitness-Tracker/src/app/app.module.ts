import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { SharedLayoutComponent } from './shared-layout/shared-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileModule } from './Modules/profile/profile.module';
import { WorkoutModule } from './Modules/workout/workout.module';
import { GoalListComponent } from './Modules/goal/goal-list/goal-list.component';
import { GoalFormComponent } from './Modules/goal/goal-form/goal-form.component';
import { GoalModule } from './Modules/goal/goal.module';
import { AdminDashboardComponent } from './Modules/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Modules/dashboard/user-dashboard/user-dashboard.component';
import { DashboardModule } from './Modules/dashboard/dashboard.module';
import { AuthService } from './services/auth.service';
import { LogMealComponent } from './Modules/meal/log-meal/log-meal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SharedLayoutComponent,
    HeaderComponent,
    FooterComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ProfileModule,
    WorkoutModule,
    GoalModule,
    DashboardModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    
  },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
