import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Toast } from '../util/Toast';


@Component({
  selector: 'app-showqr',
  templateUrl: './showqr.page.html',
  styleUrls: ['./showqr.page.scss'],
})
export class ShowqrPage implements OnInit {

  private id: string;
  private fecha: string;
  private hora: string;

  constructor(public barcodeScanner: BarcodeScanner,
    private navCtrl:NavController,
    private navParams: NavParams, 
    private base64:Base64ToGallery,
    private toast:Toast,
    private modalController: ModalController) { 
      this.fecha=this.navParams.get("fecha");
      this.hora=this.navParams.get("hora");
  }
  ngOnInit() {
  }

  getTextToQr(){
    return this.navParams.get("id");
  }

  goBack(){
    this.navCtrl.navigateBack('/tabs');
  }

  /**
   * Función que descarga el codigo qr en la galeria de un dispositivo movil
   * mediante una conversion a base 64
   */
  downloadQR(){
    const canvas= document.queryCommandValue('src');
    const imageData= canvas.toString();

    let data = imageData.split(',')[1];
    console.log(data)
    this.base64.base64ToGallery(data, {prefix: '_img', mediaScanner:true })
    .then(res=>{
      this.toast.presentToast('Qr guardado en la Galeria', 2000, 'success');
    },err=>console.log('err: ', err)
    );
  }
}
