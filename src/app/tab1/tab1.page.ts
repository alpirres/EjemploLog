import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { UiComponent } from '../common/ui/ui.component';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private translate: TranslateService, 
    private auth:AuthService,
    private ui:UiComponent,
    private navCtrl: NavController,
    private router:Router) {}

  async ionViewDidEnter(){
    let mipalabra= await this.translate.get('hello').toPromise()
  }

  

  public reservar(mesa:string){
    this.navCtrl.navigateForward('/reserva/'+mesa);
  }

}
