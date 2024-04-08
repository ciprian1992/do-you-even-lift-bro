import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MaxWeightContainerComponent } from './max-weight-container.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [MaxWeightContainerComponent],
  exports: [MaxWeightContainerComponent],
})
export class MaxWeightContainerComponentModule {}
