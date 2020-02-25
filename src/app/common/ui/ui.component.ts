import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController:LoadingController,
    private alertController:AlertController
    ) { }

  ngOnInit() {}

  public async presentLoading() {
    await this.hideLoading();
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
  }

  public async hideLoading(){
    if(this.loading){
      await this.loading.dismiss(); 
    }
    this.loading=null;
  }


  public async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Deasea eliminar la nota',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: async (res) => {
            return true;
          }
        }
      ]
    });
    await alert.present();
  }    
}
