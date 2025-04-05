import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealDTO } from './meals.service';
import { User } from './admin.service';

export interface NutritionDTO{
    id: number;
    dailyCalories: number;
    dailyProtein: number;
    dailyCarbs: number;
    dailyFats: number;
    meals: MealDTO[];
    user: User;

}
@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private apiUrl = 'http://localhost:3300/api/nutrition';

  constructor(private http: HttpClient) {}

  getAllNutrition(): Observable<NutritionDTO[]> {
    return this.http.get<NutritionDTO[]>(this.apiUrl);
  }

  getNutritionById(id: number): Observable<NutritionDTO> {
    return this.http.get<NutritionDTO>(`${this.apiUrl}/${id}`);
  }

  addNutrition(nutrition: NutritionDTO): Observable<NutritionDTO> {
    return this.http.post<NutritionDTO>(this.apiUrl, nutrition);
  }

  updateNutrition(id: number, nutrition: NutritionDTO): Observable<NutritionDTO> {
    return this.http.put<NutritionDTO>(`${this.apiUrl}/${id}`, nutrition);
  }

  deleteNutrition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
