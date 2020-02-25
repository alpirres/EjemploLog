import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Routes, Router, NavigationEnd } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Toast } from './util/Toast';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Reservar',
      url: '/tabs',
      icon: 'restaurant'
    },
    {
      title: 'Mis Reservas',
      url: '/list-reservas',
      icon: 'list'
    },
    {
      title: 'Como Llegar',
      url: '/geolocate',
      icon: 'navigate'
    }
  ];
  public base64Image:string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: Globalization,
    private trans: TranslateService,
    private auth:AuthService,
    private router:Router,
    private camera: Camera
  ) {
    this.initializeApp();
    firebase.initializeApp({
      apiKey: "AIzaSyDEmZPGIs4J4oDMeEenE_hxOCOq0-koX5g",
      authDomain: "ejemplolog-d7ac9.firebaseapp.com"
    });
    this.base64Image='https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      this.trans.setDefaultLang('es')
      this.global.getPreferredLanguage().then(l=>{
        const language=l.value.substring(0,2);
        if(language==='es'){
          this.trans.use('es');
        }else{
          this.trans.use('en');
        }
      })
      .catch(err=>this.trans.use('en'))
      await this.auth.checkSession();
      if(this.auth.isAuthenticated()){
        console.log('aaaaaaa'+this.auth.user.imageUrl);
        if(this.auth.user.imageUrl.length!=0){
          this.base64Image=this.auth.user.imageUrl;
          console.log('cccccccccc'+this.base64Image);
        }
        this.router.events.subscribe(event=>{
          if(event instanceof NavigationEnd){
            if(this.router.url==='/'|| this.router.url==='/login'){
              this.router.navigate(['/tabs']);
            }
          }
        })
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  updatePic() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,  /*FILE_URI */
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: 0,
      correctOrientation: true,
      /* allowEdit:true,*/
      saveToPhotoAlbum: true,
      /*sourceType:0 es library, 1 camera, 2 saved */
      /* targetHeight:200,*/
      targetWidth: 200
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64, ' + imageData;
      this.auth.user.imageUrl=this.base64Image;
    }, (err) => {
      // Handle error
    });
  }
}
