import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = environment.API_ENDPOINT;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  get userValue(): any {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post(this.basePath + '/users/login', { email: email, password: password }).pipe(map((user: any) => {

      user.authdata = window.btoa(email + ':' + password);
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({});
    this.router.navigate(['auth/login']);
  }

  register(email: string, password: string, firstName: string, lastName: string, confirmPassword: string) {
    return this.http.post(this.basePath + '/users/register',
      { email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName });
  }
}
