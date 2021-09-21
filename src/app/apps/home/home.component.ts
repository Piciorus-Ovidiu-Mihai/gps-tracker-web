import { Component, OnInit } from '@angular/core';
import { UserLocationService } from 'src/app/libs/services/user-location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  zoom = 12;
  markers: any[] = [];
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

  constructor(private userLocationService: UserLocationService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.getAllLocations();
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
    console.log(this.markers);
  }

  zoomIn() {
    if (this.zoom < (this.options.maxZoom ? this.options.maxZoom : this.zoom)) this.zoom++
  }

  zoomOut() {
    if (this.zoom > (this.options.minZoom ? this.options.minZoom : this.zoom)) this.zoom--
  }
}
