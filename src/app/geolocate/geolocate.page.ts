import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LocationService,
  MyLocation,
  LatLng
} from '@ionic-native/google-maps';
declare var google;

@Component({
  selector: 'app-geolocate',
  templateUrl: './geolocate.page.html',
  styleUrls: ['./geolocate.page.scss'],
})
export class GeolocatePage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapNativeElement: ElementRef;

  map: GoogleMap;

  constructor(private googleMaps: GoogleMaps) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 37.6734601, // default location
          lng: -4.931912 // default location
        },
        zoom: 10,
        tilt: 0
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'red',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


}
