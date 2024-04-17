import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaxWeightPage } from './max-weight.page';

import { MaxWeightPageRoutingModule } from './max-weight-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MaxWeightPage,
    MaxWeightPageRoutingModule,
  ],
  declarations: [],
})
export class MaxWeightPageModule {}
