import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home'; // Uus!
import { PetFormComponent } from './components/pet-form/pet-form';
import { Login } from './components/login/login';
import { MicrochipComponent } from './components/add-microchip/add-microchip';
import { PetList } from './components/pets/pet-list/pet-list';
import { UserFormComponent } from './components/user-form/user-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: UserFormComponent },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', component: DashboardHomeComponent }, // Vaikimisi vaade
      { path: 'pets/new', component: PetFormComponent }, // Vormi vaade
      { path: 'microchips/new', component: MicrochipComponent },
      { path: 'pets', component: PetList },
    ],
  },
];
