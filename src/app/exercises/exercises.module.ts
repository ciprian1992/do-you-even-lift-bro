import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExercisesPageRoutingModule } from './exercises-routing.module';
import { ExercisesPage } from './exercises.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExercisesPage,
    ExercisesPageRoutingModule,
  ],
  declarations: [],
})
export class ExercisesPageModule {}
