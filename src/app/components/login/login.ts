import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = "";
  password = "";
  errorMessage = "";

  constructor(private authService: Auth, private router: Router){}

  onLogin(): void {
    const success = this.authService.login(this.username, this.password);
    if(success){
      // FIXME: dashboard link may change later
      this.router.navigate(["/dashboard"]);
    }
    else {
      this.errorMessage = "Invalid username or password";
    }
  }
}
