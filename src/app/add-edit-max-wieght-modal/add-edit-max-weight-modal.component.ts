import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
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
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Exercise, EXERCISES } from './exercises.const';

import { from } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  docSnapshots,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { MaxWeight } from '../domain';
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'app-add-edit-max-weight-modal',
  templateUrl: 'add-edit-max-weight-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class AddEditMaxWeightModalComponent implements OnInit, OnDestroy {
  @Input() public id?: string;
  @Input() public maxWeight?: MaxWeight;

  public MUSCLE_GROUPS = muscleGroups;
  public formGroup = new FormGroup({
    muscleGroup: new FormControl<MuscleGroup | null>(null, Validators.required),
    exercise: new FormControl<string | null>(null, Validators.required),
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
      tap((value) => console.log(value)),
      map((exercises) =>
        exercises.sort((a, b) => a.name.localeCompare(b.name))
      ),
      shareReplay(1)
    );
  }
  public ngOnInit(): void {
    if (this.id) {
      this.subscriptions.add(this.initializeFormsOnEdit(this.id));
    }

    this.subscriptions.add(this.closeOnSave());

    if (this.maxWeight) {
      setTimeout(() => {
        this.formGroup.patchValue({
          muscleGroup: this.maxWeight?.muscleGroup,
          exercise: this.maxWeight?.exercise,
          maxWeight: this.maxWeight?.maxWeight,
          reps: this.maxWeight?.reps,
          info: this.maxWeight?.info ?? '',
        });
      }, 0);
    }
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

  private closeOnSave(): Subscription {
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

          if (this.id) {
            const docRef = doc(collectionRef, this.id);
            return from(
              updateDoc(docRef, {
                exercise: formGroup.exercise,
                muscleGroup: formGroup.muscleGroup,
                maxWeight: formGroup.maxWeight,
                reps: formGroup.reps,
                info: formGroup.info,
                date: new Date(),
              })
            );
          }

          return from(
            addDoc(collectionRef, {
              exercise: formGroup.exercise,
              muscleGroup: formGroup.muscleGroup,
              maxWeight: formGroup.maxWeight,
              reps: formGroup.reps,
              info: formGroup.info,
              date: new Date(),
            })
          );
        })
      )
      .subscribe(() => this.modalCtrl.dismiss());
  }

  private initializeFormsOnEdit(maxWeightId: string): Subscription {
    return this.userId$
      .pipe(
        switchMap((userId) => {
          const docRef = doc(
            collection(this.firestore, 'users', userId, 'max-weights'),
            maxWeightId
          );

          return docSnapshots(docRef);
        }),
        map((doc) => doc.data() as MaxWeight | null),
        take(1)
      )
      .subscribe((maxWeight: MaxWeight | null) => {
        if (maxWeight) {
          this.formGroup.patchValue({
            muscleGroup: maxWeight.muscleGroup,
            exercise: maxWeight.exercise,
            maxWeight: maxWeight.maxWeight,
            reps: maxWeight.reps,
            info: maxWeight.info,
          });
        }
      });
  }
}
