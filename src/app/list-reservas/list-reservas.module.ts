import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReservasPageRoutingModule } from './list-reservas-routing.module';

import { ListReservasPage } from './list-reservas.page';
import { UiComponent } from '../common/ui/ui.component';
import { ShowqrPage } from '../showqr/showqr.page';
import { ShowqrPageModule } from '../showqr/showqr.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowqrPageModule,
    ListReservasPageRoutingModule
  ],
  declarations: [ListReservasPage],
  providers:[UiComponent, ShowqrPage],
  entryComponents: [ShowqrPage]
})
export class ListReservasPageModule {}
