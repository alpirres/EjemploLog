import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowqrPageRoutingModule } from './showqr-routing.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ShowqrPage } from './showqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowqrPageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [ShowqrPage]
})
export class ShowqrPageModule {}
