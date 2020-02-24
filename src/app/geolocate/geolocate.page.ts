import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-geolocate',
  templateUrl: './geolocate.page.html',
  styleUrls: ['./geolocate.page.scss'],
})
export class GeolocatePage implements OnInit, AfterViewInit {
@ViewChild('mapElement',{static:false}) mapNativeElement: ElementRef;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  constructor( private geolocation: Geolocation) {
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: this.currentLocation
    });
    this.directionsDisplay.setMap(map);
    /*const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: 'la polvora, la carlota (cordoba)',
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });*/
  }



}
