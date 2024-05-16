import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';
import { ExerciseWithInfo, exerciseType } from '../exercises/exercises.const';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: 'exercise-modal.component.html',
  styleUrls: ['exercise-modal.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class ExerciseModalComponent {
  @Input() public exercise?: ExerciseWithInfo;

  private modalCtrl = inject(ModalController);

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
