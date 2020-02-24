import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, NavParams } from '@ionic/angular';


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
    private navParams: NavParams, 
    private modalController: ModalController) { 
      this.fecha=this.navParams.get("fecha");
      this.hora=this.navParams.get("hora");
  }
  ngOnInit() {
  }

  getTextToQr(){
    return this.navParams.get("id");
  }

}
