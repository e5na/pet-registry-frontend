import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      // Isikukood: 11 numbrit
      personalCode: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9+]{7,15}$')]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.registerUser();
  }

  registerUser(): void {
    if (this.userForm.valid) {
      const { address, ...userData } = this.userForm.value;
      const formData = {
        ...userData,
        ownerProfile: {
          address: address,
        },
      };

      this.userService.registerUser(formData).subscribe({
        next: (response) => {
          alert('Kasutaja registreeritud!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.userForm.get('personalCode')?.setErrors({ alreadyExists: true });
          } else {
            console.error('Error on registration:', err);
            alert('Viga kasutaja registreerimisel!');
          }
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
