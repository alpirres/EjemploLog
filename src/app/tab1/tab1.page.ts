import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private translate: TranslateService, 
    private auth:AuthService,
    private ui:UiComponent,
    private router:Router) {}

  async ionViewDidEnter(){
    let mipalabra= await this.translate.get('hello').toPromise()
  }

  public async cerrarSesion(){
    this.ui.presentLoading();
    await this.auth.logOut();
    this.ui.hideLoading();
  }

  public cambiarPage(){
    this.router.navigate(['/tabs/tab2'])
  }

}
