import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll, ModalController } from '@ionic/angular';
import { Comida } from '../Model/Comida';
import { UiComponent } from '../common/ui/ui.component';
import { ReservaService } from '../services/reserva.service';
import { ShowqrPage } from '../showqr/showqr.page';

@Component({
  selector: 'app-list-reservas',
  templateUrl: './list-reservas.page.html',
  styleUrls: ['./list-reservas.page.scss'],
})
export class ListReservasPage implements OnInit {

  @ViewChild(IonVirtualScroll, {static:true}) virtualScroll: IonVirtualScroll;
  dataList:any;

  constructor(private ui:UiComponent, 
    private reserva:ReservaService,
    private modalController: ModalController) {}

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

  public borraNota(id: string) {
  }    


}
