import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  personalCode = '';
  password = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin(): void {
    this.auth.login(this.personalCode, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Vale isikukood või parool';
      }
    });
  }
}