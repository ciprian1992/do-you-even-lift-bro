import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisesContainerComponent } from './exercises-container.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ExercisesContainerComponent],
  exports: [ExercisesContainerComponent],
})
export class ExercisesContainerComponentModule {}
