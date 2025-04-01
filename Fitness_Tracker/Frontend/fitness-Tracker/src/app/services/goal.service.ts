import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Goal {
  id?: number;
  name: string;
  goalType: string;
  target: string;
  deadline?: string;
  progress?: number;
  achieved?: boolean;
  createdAt?: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:3300/api/goals'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all goals for a specific user
  getGoals(userId: number): Observable<Goal[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Goal[]>(`${this.baseUrl}/getgoals?userId=${userId}`, { headers });
  }

  // Create a new goal
  createGoal(userId: number, goalData: Goal): Observable<Goal> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Goal>(`${this.baseUrl}/createGoal`, { userId, goalData }, { headers });
  }

  // Update goal
  updateGoal(goalId: number, progress: number, achieved: boolean): Observable<Goal> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Goal>(`${this.baseUrl}/updateGoal`, { goalId, progress, achieved }, { headers });
  }

  // Delete a goal
  deleteGoal(goalId: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/goals/${goalId}`, { headers });
  }
}