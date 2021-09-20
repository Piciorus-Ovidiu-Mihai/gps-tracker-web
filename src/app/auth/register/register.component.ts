import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/libs/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm: NgForm;
  email = '';
  password = '';
  lastName = '';
  firstName = '';
  confirmPassword = '';

  constructor(protected authService: AuthService, protected router: Router) { }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  async register(registerForm: NgForm) {
    if (registerForm.invalid) return;

    try {
      await this.authService.register(this.email, this.password, this.firstName, this.lastName, this.confirmPassword).pipe(finalize(() => this.router.navigateByUrl('/'))).toPromise();
    } finally {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
