import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/libs/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  invalidCredentials = false;
  loading = false;

  constructor(protected authService: AuthService, protected router: Router) { }

  async login(form: NgForm) {
    this.invalidCredentials = false;
    if (form.invalid) return;
    try {
      this.loading = true;
      await this.authService.login(this.email, this.password).pipe(finalize(() => this.router.navigateByUrl('/'))).toPromise();
    } catch (e) {
      this.invalidCredentials = true;
    } finally {
      this.loading = false;
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/auth/register');
  }
}
