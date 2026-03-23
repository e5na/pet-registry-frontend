import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RoleEnum } from '../models/role.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(personalCode: string, password: string): Observable<User> {
    const credentials = btoa(`${personalCode}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post<User>(`${this.API_URL}/login`, null, { headers }).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('credentials', credentials);
      })
    );
  }

  register(data: any): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/register`, data);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('credentials');
  }

  getCurrentUser(): User | null {
    return this.currentUser ?? JSON.parse(localStorage.getItem('user') || 'null');
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: RoleEnum): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.some(r => r.name === role) ?? false;
  }
}
