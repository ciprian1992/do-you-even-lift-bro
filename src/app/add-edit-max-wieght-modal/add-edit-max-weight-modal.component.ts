import { Component, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MuscleGroup, muscleGroups } from './musle-groups.const';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, map, shareReplay } from 'rxjs';
import { Exercise, EXERCISES } from './exercises.const';

@Component({
  selector: 'app-add-edit-max-weight-modal',
  templateUrl: 'add-edit-max-weight-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class AddEditMaxWeightModalComponent {
  public MUSCLE_GROUPS = muscleGroups;
  public formGroup = new FormGroup({
    muscleGroup: new FormControl<MuscleGroup | null>(null, Validators.required),
    exercise: new FormControl(null, Validators.required),
    maxWeight: new FormControl(0),
    reps: new FormControl(0),
    info: new FormControl(''),
  });
  public exercises$: Observable<Exercise[]>;

  private modalCtrl = inject(ModalController);

  constructor() {
    this.exercises$ = this.formGroup.controls.muscleGroup.valueChanges.pipe(
      map((group) => (group ? EXERCISES.get(group) || [] : [])),
      map((exercises) =>
        exercises.sort((a, b) => a.name.localeCompare(b.name))
      ),
      shareReplay(1)
    );
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
