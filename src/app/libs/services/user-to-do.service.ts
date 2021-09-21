import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserToDoService {
  private basePath = environment.API_ENDPOINT + "/todo";

  constructor(private http: HttpClient) { }

  get(userId: number) {
    return this.http.get(this.basePath + '/get' + '/' + userId);
  }

  complete(email: string, complete: boolean, userId: number) {
    return this.http.put(this.basePath + '/update' + '/' + userId, { email: email, complete: complete });
  }

  delete(id: number){
    return this.http.delete(this.basePath + '/delete' + '/' + id);
  }

}
