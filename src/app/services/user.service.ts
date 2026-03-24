import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateUserRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) {}

  registerUser(data: CreateUserRequest) {
    return this.http.post(this.API_URL, data);
  }
}
