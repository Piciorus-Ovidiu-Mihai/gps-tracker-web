import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserLocationService } from 'src/app/libs/services/user-location.service';
import { UserService } from 'src/app/libs/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  zoom = 12;
  markers: any[] = [];
  startDate: Date;
  endDate: Date;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  locations: any = [];
  users: any = [];
  user: any;


  constructor(private userLocationService: UserLocationService, private userService: UserService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.getAllLocations();
    this.getUsers();
  }

  async getAllLocations() {
    const result = await this.userLocationService.getAllLocations().toPromise();
    if (result) this.locations = result;

    this.locations.forEach((location: any) => {
      this.markers.push({
        position: {
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude),
        },
        label: {
          color: 'red',
          text: 'Marker label ',
        },
        title: 'Marker title ',
        options: { animation: google.maps.Animation.BOUNCE },
      })
    });
  }

  async getUsers() {
    const result = await this.userService.getUsers().toPromise();
    if (result) this.users = result;
  }

  zoomIn() {
    if (this.zoom < (this.options.maxZoom ? this.options.maxZoom : this.zoom)) this.zoom++
  }

  zoomOut() {
    if (this.zoom > (this.options.minZoom ? this.options.minZoom : this.zoom)) this.zoom--
  }

  async getLocationsBetweenDates() {
    if (this.startDate && this.endDate && this.user) {

      const result = await this.userLocationService
        .getLocationBetweenDates(moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format("YYYY-MM-DD"), this.user).toPromise();
      if (!result) return;
      this.markers = [];
      this.locations = result;
      this.locations.forEach((location: any) => {
        this.markers.push({
          position: {
            lat: parseFloat(location.latitude),
            lng: parseFloat(location.longitude),
          },
          label: {
            color: 'red',
            text: 'Marker label ',
          },
          title: 'Marker title ',
          options: { animation: google.maps.Animation.BOUNCE },
        })
      });
    }
  }

  onChange() {
    this.getLocationsBetweenDates();
  }
}
