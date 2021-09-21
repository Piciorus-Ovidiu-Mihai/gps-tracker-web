import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  private basePath = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {
  }

  getAllLocations() {
    return this.http.get(this.basePath + '/locations/all-locations');
  }

  getLocationBetweenDates(startDate: string, endDate: string, userId: number) {
    return this.http.post(this.basePath + '/locations/filterByStartAndEnd', {startDate: startDate, endDate: endDate, userId: userId});
  }
}

