import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReservaPageRoutingModule } from './reserva-routing.module';
import { ReservaPage } from './reserva.page';
import { UiComponent } from '../common/ui/ui.component';
import { ShowqrPage } from '../showqr/showqr.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxQRCodeModule ,
    ReservaPageRoutingModule
  ],
  declarations: [ReservaPage],
  providers:[UiComponent],
  entryComponents:[],
})
export class ReservaPageModule {}
