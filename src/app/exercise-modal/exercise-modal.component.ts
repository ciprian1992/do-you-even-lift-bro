import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';
import { exerciseType } from '../exercises/exercises.const';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: 'exercise-modal.component.html',
  styleUrls: ['exercise-modal.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class ExerciseModalComponent {
  @Input() public exerciseType?: exerciseType;
  @Input() public exercise?: Exercise;

  private modalCtrl = inject(ModalController);

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public get exerciseImage(): string {
    return `assets/exercises/${this.exerciseType}/${this.exercise?.value}.gif`;
  }
}
