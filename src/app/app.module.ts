import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globalization } from '@ionic-native/globalization/ngx';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ShowqrPage } from './showqr/showqr.page';
import { FiltroPipe } from './pipes/filtro.pipe';
import { ShowqrPageModule } from './showqr/showqr.module';
import { UiComponent } from './common/ui/ui.component';
export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,"./assets/i18n/",".json");
}

@NgModule({
  declarations: [AppComponent,ShowqrPageModule,UiComponent, FiltroPipe],
  entryComponents: [ShowqrPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig,'EjemploLog'),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    NgxQRCodeModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })],
  providers: [
    GooglePlus,
    NativeStorage,
    AuthGuardService,
    FormsModule,
    AuthService,
    TranslateService,
    HttpClient,
    Globalization,
    Geolocation,
    Camera, 
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Base64ToGallery,
    GoogleMaps 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
