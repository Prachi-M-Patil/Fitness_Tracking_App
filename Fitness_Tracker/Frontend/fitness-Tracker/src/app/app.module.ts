import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './Modules/auth/register/register.component';
import { LoginComponent } from './Modules/auth/login/login.component';
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
import { AuthModule } from './Modules/auth/auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MealModule } from './Modules/meal/meal.module';


@NgModule({
  declarations: [
    AppComponent,
    SharedLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ProfileModule,
    WorkoutModule,
    GoalModule,
    DashboardModule,
    AuthModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MealModule
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
