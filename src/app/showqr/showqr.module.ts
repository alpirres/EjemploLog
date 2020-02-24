import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowqrPageRoutingModule } from './showqr-routing.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ShowqrPage } from './showqr.page';
import { ReservaPageModule } from '../reserva/reserva.module';
import { ListReservasPageModule } from '../list-reservas/list-reservas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageModule,
    ListReservasPageModule,
    ShowqrPageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [ShowqrPage],
  exports:[ ShowqrPage ]
})
export class ShowqrPageModule {}
