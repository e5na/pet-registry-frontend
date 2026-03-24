import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import { RoleEnum } from '../../models/role.model';
import { User } from '../../models/user.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  RoleEnum = RoleEnum;
  currentUser: User | null = null;
  activeRole: RoleEnum | null = null;
  showBackButton = false;

  constructor(
    public auth: Auth,
    private router: Router,
  ) {
    this.currentUser = this.auth.getCurrentUser();

    // If only one role, set it automatically
    if (this.currentUser?.roles?.length === 1) {
      this.activeRole = this.currentUser.roles[0].name;
    }
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();

    // Jälgime ruuteri muutusi
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Kui URL on täpselt '/dashboard', siis nuppu ei näita.
        // Kõikide muude alamlehtede puhul (nt /dashboard/pet-form) näitame.
        this.showBackButton = event.urlAfterRedirects !== '/dashboard';
      });
  }

  isMainDashboard(): boolean {
    // Kui URL on täpselt '/dashboard', siis näitame paneele
    return this.router.url === '/dashboard';
  }

  setRole(role: RoleEnum): void {
    this.activeRole = role;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
