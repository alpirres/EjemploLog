import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Routes, Router, NavigationEnd } from '@angular/router';

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
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private global: Globalization,
    private trans: TranslateService,
    private auth:AuthService,
    private router:Router
  ) {
    this.initializeApp();
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
}
