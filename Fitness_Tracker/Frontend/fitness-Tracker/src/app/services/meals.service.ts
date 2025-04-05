import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './admin.service';
import { NutritionDTO } from './nutrition.service';
import Swal from 'sweetalert2';

export interface MealDTO {
    id: number;
    name: string;
    mealtype: string;
    calories: number;
    Protein: number;
    carbs: number;
    fats: number;
    rating: number;
    liked: boolean;
    available: boolean;
    nutrition: NutritionDTO;
    users: User;
}

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'http://localhost:3300/api/meals';

  constructor(private http: HttpClient) {}

  getAllMeals(): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(this.apiUrl);
  }

  getMealById(id: number): Observable<MealDTO> {
    return this.http.get<MealDTO>(`${this.apiUrl}/${id}`);
  }

  addMeal(meal: MealDTO): Observable<MealDTO> {
    return this.http.post<MealDTO>(this.apiUrl, meal).pipe(
      catchError((error) => {
        if (error.status === 403) {
          // Show SweetAlert message
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You do not have permission to add a meal!',
          });
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  updateMeal(id: number, meal: MealDTO): Observable<MealDTO> {
    return this.http.put<MealDTO>(`${this.apiUrl}/${id}`, meal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface MealDTO {
//   id?: number;
//   name?: string;
//   calories?: number;
//   Protein?: number;
//   carbs?: number;
//   fats?: number;
//   rating?: number;
//   available?: boolean;
//   imageUrl?: string;
//   liked?: boolean;
//   likes?: number; // Track the number of likes
 
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class MealService {
//   private baseUrl = 'http://localhost:3300/api/meals'; // Replace with your backend URL

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   }

//   logMeal(userId: number, mealData: MealDTO): Observable<MealDTO> {
//     return this.http.post<MealDTO>(`${this.baseUrl}/${userId}`, mealData, { headers: this.getHeaders() });
//   }

//   getMeals(userId: number): Observable<MealDTO[]> {
//     return this.http.get<MealDTO[]>(`${this.baseUrl}/${userId}`, { headers: this.getHeaders() });
//   }

//   createMeal(mealData: MealDTO): Observable<MealDTO> {
//     return this.http.post<MealDTO>(`${this.baseUrl}/createmeal`, mealData, { headers: this.getHeaders() });
//   }

//   updateMeal(mealId: number, mealData: MealDTO): Observable<MealDTO> {
//     return this.http.put<MealDTO>(`${this.baseUrl}/${mealId}`, mealData, { headers: this.getHeaders() });
//   }

//   getMealRecommendations(userId: number): Observable<MealDTO[]> {
//     return this.http.get<MealDTO[]>(`${this.baseUrl}/recommendations/${userId}`, { headers: this.getHeaders() });
//   }

//   rateMeal(userId: number, mealId: number, rating: number): Observable<void> {
//     return this.http.post<void>(`${this.baseUrl}/rateMeal/${userId}/${mealId}`, { rating }, { headers: this.getHeaders() });
//   }

//   deleteMeal(userId: number, mealId: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/deleteMeal/${userId}/${mealId}`, { headers: this.getHeaders() });
//   }

//   getTotalMealsAvailable(): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/getTotalMealsAvailable`, { headers: this.getHeaders() });
//   }

//   getAvailableMeals(userId: number): Observable<MealDTO[]> {
//     return this.http.get<MealDTO[]>(`${this.baseUrl}/availableMeals/${userId}`, { headers: this.getHeaders() });
//   }

//   toggleLikeMeal(userId: number, mealId: number): Observable<MealDTO> {
//     return this.http.post<MealDTO>(`${this.baseUrl}/toggleLike/${userId}/${mealId}`, {}, { headers: this.getHeaders() });
//   }

// }
