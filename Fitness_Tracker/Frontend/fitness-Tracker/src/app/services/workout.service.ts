import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Workout {
  id?: number;
  type: string;
  duration: number;
  date: Date;
  caloriesBurned: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
 
  private baseUrl= 'http://localhost:3300/api/workout';

  constructor(private http:HttpClient) { }

  logworkout(userId: number, workoutData: Workout): Observable<Workout>{
    return this.http.post<Workout>(`${this.baseUrl}/logworkout`, {userId, workoutData});
  }

  getWorkouts(userId: number): Observable<Workout[]>
{
  return this.http.post<Workout[]>(`${this.baseUrl}/getworkouts/`, {userId});
}}
