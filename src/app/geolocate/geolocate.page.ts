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
  myposition:any;
  //directionsService = new google.maps.DirectionsService;
  //directionsRenderer = new google.maps.DirectionsRenderer;

  constructor(private googleMaps: GoogleMaps) {
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 0,
           lng: 0
         },
         zoom: 10,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    //this.directionsRenderer.setMap(this.map);

    let marker: Marker = this.map.addMarkerSync({
      title: 'La Polvora',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 37.6733774,
        lng: -4.9319722
      }
    });
    this.getPosition();
  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng,
        });
        this.myposition=response.latLng;
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

  
  /*calculateAndDisplayRoute() {
    this.directionsService.route({
        origin: 'chicago, il',
        destination: 'st louis, mo',
        travelMode: 'DRIVING'
      },(response, status) =>{
        if (status === 'OK') {
    this.directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }*/
  


}
