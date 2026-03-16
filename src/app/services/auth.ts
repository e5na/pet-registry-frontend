import { Injectable } from '@angular/core';
import { RoleEnum } from "../models/role.model";

interface MockUser {
  username: string;
  password: string;
  role: RoleEnum;
}

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private readonly MOCK_USERS: MockUser[] = [
    {username: "admin", password: "admin", role: RoleEnum.ADMIN},
    {username: "vet", password: "vet", role: RoleEnum.VET},
    {username: "owner", password: "owner", role: RoleEnum.OWNER}
  ];

  private currentRole: RoleEnum | null = null;

  login(username: string, password: string): boolean {
    const user = this.MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if(user) {
      this.currentRole = user.role;
      localStorage.setItem("role", user.role);
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentRole = null;
    localStorage.removeItem("role");
  }

  getRole(): RoleEnum | null {
    return this.currentRole ?? localStorage.getItem("role") as RoleEnum | null;
  }

  isLoggedIn(): boolean {
    return this.getRole() !== null;
  }
  // Check if the user has correct role 
  hasRole(role: RoleEnum): boolean {
    return this.getRole() === role;
  }

}
