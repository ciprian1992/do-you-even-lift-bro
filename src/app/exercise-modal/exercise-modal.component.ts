import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';
import { ExerciseWithInfo, exerciseType } from '../exercises/exercises.const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: 'exercise-modal.component.html',
  styleUrls: ['exercise-modal.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class ExerciseModalComponent {
  @Input() public exercise?: ExerciseWithInfo;

  public imageIsLoaded = false;
  private modalCtrl = inject(ModalController);

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public imageLoaded() {
    this.imageIsLoaded = true;
  }
}
