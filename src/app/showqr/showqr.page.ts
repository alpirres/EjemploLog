import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-showqr',
  templateUrl: './showqr.page.html',
  styleUrls: ['./showqr.page.scss'],
})
export class ShowqrPage implements OnInit {

  qrData = null;
  createdCode = null;

  constructor(public barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  downloadQR(){

  }

  createCode () {
    this.createdCode = this.qrData;
    console.log(this.createdCode);
  }


}
