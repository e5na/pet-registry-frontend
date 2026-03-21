import { Injectable } from '@angular/core';
import { RoleEnum } from "../models/role.model";
import { LoginRequest, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly API_URL = "http://localhost:8080/api/auth"
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(personalCode: string, password: string,roleType?: RoleEnum): Observable<User> {
    const body: LoginRequest = { personalCode, password, roleType };
    return this.http.post<User>(`${this.API_URL}/login`, body).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
    );
  } 

  register(data: any): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/register`, data);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("user");
  }

  getCurrentUser(): User | null {
    return this.currentUser ?? JSON.parse(localStorage.getItem("user") || "null");
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  // Check if a user and role exists, and if they do, then check against existing roles
  hasRole(role: RoleEnum): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.some(r => r.name === role) ?? false;
  }

}
