import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  personalCode = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  onLogin(): void {
    this.auth.login(this.personalCode, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid personal code or password';
      },
    });
  }
}
