import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaxWeightPage } from './max-weight.page';

import { MaxWeightPageRoutingModule } from './max-weight-routing.module';
import { MaxWeightContainerComponentModule } from '../max-weight-container/max-weight-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MaxWeightContainerComponentModule,
    MaxWeightPageRoutingModule,
  ],
  declarations: [MaxWeightPage],
})
export class MaxWeightPageModule {}
