import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {
  }

  getUsers(){
    return this.http.get(this.basePath + '/users/users');
  }
}
