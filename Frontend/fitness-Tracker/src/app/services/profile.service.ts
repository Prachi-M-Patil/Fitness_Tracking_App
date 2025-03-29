import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  fitnessLevel: string;
  user?: { id: number };
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:3300/api/profile'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch a profile by userId
  getProfile(userId: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profile/${userId}`);
  }

  // Create a new profile
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/createprofile`, profile);
  }

  // Update an existing profile
  updateProfile(userId: number, profile: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/profile/${userId}`, profile);
  }
}
