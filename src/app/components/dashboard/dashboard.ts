import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import { RoleEnum } from '../../models/role.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  RoleEnum = RoleEnum;
  currentUser: User | null = null;
  activeRole: RoleEnum | null = null;

  constructor(public auth: Auth, private router: Router) {
    this.currentUser = this.auth.getCurrentUser();

    // If only one role, set it automatically
    if (this.currentUser?.roles?.length === 1) {
      this.activeRole = this.currentUser.roles[0].name;
    }
  }

  isMainDashboard(): boolean {
    // Kui URL on täpselt '/dashboard', siis näitame paneele
    return this.router.url === '/dashboard';
  }

  setRole(role: RoleEnum): void {
    this.activeRole = role;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
