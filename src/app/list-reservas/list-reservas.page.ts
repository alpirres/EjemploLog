import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll, ModalController, AlertController } from '@ionic/angular';
import { Comida } from '../Model/Comida';
import { UiComponent } from '../common/ui/ui.component';
import { ReservaService } from '../services/reserva.service';
import { ShowqrPage } from '../showqr/showqr.page';
import { Toast } from '../util/Toast';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.page.html',
  styleUrls: ['./list-reservas.page.scss'],
})
export class ListReservasPage implements OnInit {

  @ViewChild(IonVirtualScroll, {static:true}) virtualScroll: IonVirtualScroll;
  dataList:any;
  textoBuscar= '';

  constructor(private ui:UiComponent, 
    private reserva:ReservaService,
    private modalController: ModalController,
    public alertController: AlertController,
    public myToast:Toast) {}

  ngOnInit() {
    this.refrescar();
  }

  public doRefresh(e:any){
    this.refrescar().then(()=>{
      e.target.complete()
    },
    error => {
      console.log('Refrescar fallido')
      e.target.complete()
    });
}

  private async refrescar() {
    await this.ui.presentLoading();
    this.dataList = [];
    try{
      this.reserva.readTodo().subscribe((lista) => {
      this.dataList = lista;
      this.ui.hideLoading();
      },
      error=>{
        console.log('Cargar fallido')
      });
    }catch{
      console.log('Cargar fallido')
      this.ui.hideLoading();
    }
  }

  public searchBar(evt){
    console.log(evt.target.value);
    let texto=evt.target.value;
    this.textoBuscar=texto;
  }

  async editaNota(id:string ,fecha:string ,hora:string ){
    
    const modal = await this.modalController.create({
      
      component: ShowqrPage,
      componentProps: {
        id:id, 
        fecha:fecha, 
        hora: hora
      }
     });
     modal.onWillDismiss().then(d=>{
        console.log("Se cierra la modal.");
        this.refrescar();
     });
     return await modal.present();
  }

   public async borraNota(id: string) {
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
          handler: async () => {
            await this.reserva.deleteTodo(id).then((salida) => {
              this.refrescar();
              console.log("Borrando");
              this.myToast.presentToast('Nota Eliminada',2000,'success');
            }).catch((err) => {
              console.log(err);
            })
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }   


}
