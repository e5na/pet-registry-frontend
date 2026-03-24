import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home'; // Uus!
import { PetFormComponent } from './components/pet-form/pet-form';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { 
    path: 'dashboard', 
    component: Dashboard, 
    children: [
      { path: '', component: DashboardHomeComponent }, // Vaikimisi vaade
      { path: 'pets/new', component: PetFormComponent }  // Vormi vaade
    ]
  }
];
