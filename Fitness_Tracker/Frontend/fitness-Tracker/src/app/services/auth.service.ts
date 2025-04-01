import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:3300/api/auth`;

  // BehaviorSubject to track the authentication state
  private authTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken());
  public authToken$: Observable<string | null> = this.authTokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.token; // Assuming the response contains a token
        this.saveToken(token); // Save token to local storage
        localStorage.setItem('userId', response.user.id);
        this.authTokenSubject.next(token); // Update the BehaviorSubject with the new token
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): Observable<boolean> {
    return this.authToken$.pipe(
      map(token => !!token) // Converts `string | null` to `boolean`
    );
  }

  
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.authTokenSubject.next(null); // Update the BehaviorSubject to null
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  fetchSecretKey(): Observable<any> {
    const secretKey = this.http.get(`${this.apiUrl}/secret-key`);
    return secretKey;
  
  }
  
  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }
}
