import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comida } from '../Model/Comida';
import { ReservaService } from '../services/reserva.service';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { UiComponent } from '../common/ui/ui.component';
import { Toast } from 'src/util/Toast';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  public mesa:string;
  public reservaForm:FormGroup;
  public form = [
    { val: 'Brabas', isChecked: true },
    { val: 'Berenjenas', isChecked: false },
    { val: 'Croquetas', isChecked: false },
    { val: 'Alitas', isChecked: false },
    { val: 'Lagrimitas', isChecked: false },
    { val: 'Revuelto de Bacalao', isChecked: false },
    { val: 'Almejas', isChecked: false },
    { val: 'Ravioli', isChecked: false },
    { val: 'Churrasco', isChecked: false }
  ];

  constructor(private route: ActivatedRoute,
    private todoS:ReservaService, 
    private formBuilder:FormBuilder,
    private navCtrl: NavController,
    public myToast:Toast,
    private ui:UiComponent) { 
  }

  ngOnInit() {
    this.mesa = this.route.snapshot.paramMap.get('m');
  }
  
  addComida(){
    let data:Comida;
    data={
      fecha:this.reservaForm.get('fecha').value,
      hora:this.reservaForm.get('hora').value,
      comida:this.reservaForm.get('comida').value,
      comentario:this.reservaForm.get('comentario').value
    };
    this.ui.presentLoading();
    this.todoS.addTodo(data)
    .then((ok)=>{
      this.myToast.presentToast("Reserva Agregada",2000,'success');
      this.reservaForm.reset();
      
    })
    .catch((err)=>{
      this.myToast.presentToast('Error Realizando Reserva',4000,'danger' )
    })
    .finally(()=>{
      this.ui.hideLoading();
      this.navCtrl.navigateForward('/tabs/tab2');
    })
  }



}
