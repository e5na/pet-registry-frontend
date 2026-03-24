import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { PetList} from "./components/pets/pet-list/pet-list";
import { PetTransferComponent } from './components/pet-transfer/pet-transfer';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'pets', component: PetList },
  { path: 'ownership-transfer/:petId', component: PetTransferComponent },
];