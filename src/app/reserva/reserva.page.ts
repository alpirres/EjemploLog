import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comida } from '../Model/Comida';
import { ReservaService } from '../services/reserva.service';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { UiComponent } from '../common/ui/ui.component';
import { Toast } from '../util/Toast';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  public mesa:string;
  public data:Comida=null;
  public comida:string[]=[];
  public total:number =0;
  public reservaForm:FormGroup;
  public form = [
    { val: 'Brabas', isChecked: false, price: 6 },
    { val: 'Berenjenas', isChecked: false, price: 7},
    { val: 'Croquetas', isChecked: false, price: 6.5 },
    { val: 'Alitas', isChecked: false, price: 8 },
    { val: 'Lagrimitas', isChecked: false, price: 6 },
    { val: 'Revuelto de Bacalao', isChecked: false, price: 8 },
    { val: 'Almejas', isChecked: false, price: 7 },
    { val: 'Ravioli', isChecked: false, price: 9 },
    { val: 'Churrasco', isChecked: false, price: 8.5 }
  ];
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private route: ActivatedRoute,
    private todoS:ReservaService, 
    private formBuilder:FormBuilder,
    private navCtrl: NavController,
    private barcodeScanner:BarcodeScanner,
    private base64:Base64ToGallery,
    public myToast:Toast,
    private ui:UiComponent) {
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
    }

  ngOnInit() {
    this.mesa = this.route.snapshot.paramMap.get('m');
    this.reservaForm=this.formBuilder.group({
      fecha:['',Validators.required],
      hora:['',Validators.required],
      comida:['',Validators.required],
      comentario:['']
    })
  }

  back(){
    this.navCtrl.navigateForward('/tabs/tabs2')
  }

  onChangeCheckBox(detail: boolean, name: string, price:number){
    if(!this.comida.includes(name)&&detail){
      this.comida.push(name);
      this.total=price+this.total;
    }else{
      this.comida.splice(this.comida.indexOf(name)); 
      if(this.total!=0){
        this.total=this.total-price;
      }
    }
  }
  
  addComida(){
    this.data={
      fecha:this.reservaForm.get('fecha').value,
      hora:this.reservaForm.get('hora').value,
      comida:this.comida,
      comentario:this.reservaForm.get('comentario').value
    };
    this.ui.presentLoading();
    this.todoS.addTodo(this.data)
    .then((ok)=>{
      this.myToast.presentToast("Reserva Agregada",2000,'success');
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.data).then((encodedData) => {
        console.log(encodedData);
        this.data = encodedData;
      }, (err) => {
        console.log("Error occured : " + err);
      });
    })
    .catch((err)=>{
      this.myToast.presentToast('Error Realizando Reserva',4000,'danger' )
    })
    .finally(()=>{
      this.ui.hideLoading();
      //this.navCtrl.navigateForward('/tabs/tab2');
    })
  }

  ionViewDidLeave(){
    this.reservaForm.reset();
  }


}
