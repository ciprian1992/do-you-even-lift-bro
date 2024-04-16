import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MuscleGroup, muscleGroups } from './musle-groups.const';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  map,
  of,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Exercise, EXERCISES } from './exercises.const';

import { from } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';

@Component({
  selector: 'app-add-edit-max-weight-modal',
  templateUrl: 'add-edit-max-weight-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class AddEditMaxWeightModalComponent implements OnInit, OnDestroy {
  public MUSCLE_GROUPS = muscleGroups;
  public formGroup = new FormGroup({
    muscleGroup: new FormControl<MuscleGroup | null>(null, Validators.required),
    exercise: new FormControl(null, Validators.required),
    maxWeight: new FormControl(),
    reps: new FormControl(),
    info: new FormControl(''),
  });
  public exercises$: Observable<Exercise[]>;

  private auth = inject(Auth);
  private confirmSubject = new Subject<void>();
  private modalCtrl = inject(ModalController);
  private firestore = inject(Firestore);
  private subscriptions = new Subscription();
  private userId$ = user(this.auth).pipe(map((user) => user?.uid ?? ''));

  constructor() {
    this.exercises$ = this.formGroup.controls.muscleGroup.valueChanges.pipe(
      map((group) => (group ? EXERCISES.get(group) || [] : [])),
      map((exercises) =>
        exercises.sort((a, b) => a.name.localeCompare(b.name))
      ),
      shareReplay(1)
    );
  }
  public ngOnInit(): void {
    this.subscriptions.add(this.closeOnAddEdit());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public confirm() {
    if (this.formGroup.valid) {
      this.confirmSubject.next();
    }
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  private closeOnAddEdit(): Subscription {
    return this.confirmSubject
      .pipe(
        withLatestFrom(this.formGroup.valueChanges, this.userId$),
        switchMap(([, formGroup, userId]) => {
          const collectionRef = collection(
            this.firestore,
            'users',
            userId,
            'max-weights'
          );

          return from(
            addDoc(collectionRef, {
              name: formGroup.exercise,
              muscleGroup: formGroup.muscleGroup,
              maxWeight: formGroup.maxWeight,
              reps: formGroup.reps,
              info: formGroup.info,
              date: new Date(),
              // other fields
            })
          );
        })
      )
      .subscribe(() => this.modalCtrl.dismiss());
  }
}
