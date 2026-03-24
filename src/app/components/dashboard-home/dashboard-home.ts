import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { User } from '../../models/user.model';
import { RoleEnum } from '../../models/role.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: User | null = null;
  activeRole: string | null = null;
  
  // Teeme Enumi HTML-ile kättesaadavaks
  readonly RoleEnum = RoleEnum;

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    // Vaikimisi võtame esimese rolli, kui aktiivset pole määratud
    this.activeRole = this.currentUser?.roles[0]?.name || null;
  }

  setRole(roleName: string): void {
    this.activeRole = roleName;
    // Siia võid lisada ka logic'u, mis salvestab valitud rolli seanssi
  }
}
