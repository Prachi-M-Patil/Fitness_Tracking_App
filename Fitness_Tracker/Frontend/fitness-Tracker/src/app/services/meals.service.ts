import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MealDTO {
  id?: number;
  name?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseUrl = 'http://localhost:3300/api/meals'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  logMeal(userId: number, mealData: MealDTO): Observable<MealDTO> {
    return this.http.post<MealDTO>(`${this.baseUrl}/${userId}`, mealData, { headers: this.getHeaders() });
  }

  getMeals(userId: number): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
  }

  createMeal(mealData: MealDTO): Observable<MealDTO> {
    return this.http.post<MealDTO>(`${this.baseUrl}/createmeal`, mealData, { headers: this.getHeaders() });
  }

  updateMeal(mealId: number, mealData: MealDTO): Observable<MealDTO> {
    return this.http.put<MealDTO>(`${this.baseUrl}/${mealId}`, mealData, { headers: this.getHeaders() });
  }

  getMealRecommendations(userId: number): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(`${this.baseUrl}/recommendations/${userId}`, { headers: this.getHeaders() });
  }

  rateMeal(userId: number, mealId: number, rating: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/rateMeal/${userId}/${mealId}`, { rating }, { headers: this.getHeaders() });
  }

  deleteMeal(userId: number, mealId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMeal/${userId}/${mealId}`, { headers: this.getHeaders() });
  }

  getTotalMealsAvailable(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotalMealsAvailable`, { headers: this.getHeaders() });
  }
}
