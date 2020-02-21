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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,"./assets/i18n/",".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
