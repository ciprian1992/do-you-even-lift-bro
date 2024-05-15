import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { signOut } from 'firebase/auth';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  from,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { exerciseType, exercisesMap } from './exercises.const';
import {
  Exercise,
  exerciseValue,
} from '../add-edit-max-wieght-modal/exercises.const';
import { ExerciseModalComponent } from '../exercise-modal/exercise-modal.component';

@Component({
  selector: 'app-exercises',
  templateUrl: 'exercises.page.html',
  styleUrls: ['exercises.page.scss'],
  imports: [CommonModule, IonicModule, ExerciseModalComponent],
  standalone: true,
})
export class ExercisesPage implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private router = inject(Router);
  private exerciseTypeSubject = new BehaviorSubject<exerciseType>('push1');
  private exerciseClickSubject = new Subject<Exercise>();
  private modalController = inject(ModalController);
  private subscriptions = new Subscription();

  public user$ = user(this.auth);
  public userName$ = this.user$.pipe(
    map((user) => user?.email || user?.displayName || 'Unknown')
  );
  public exercises$: Observable<Exercise[]>;

  constructor() {
    this.exercises$ = this.exerciseTypeSubject.pipe(
      map((type) => exercisesMap.get(type) || [])
    );
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.openExerciseDialog());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }

  public exerciseTypeChanged(event: CustomEvent) {
    this.exerciseTypeSubject.next(event.detail.value as exerciseType);
  }

  public onExerciseClick(exercise: Exercise): void {
    this.exerciseClickSubject.next(exercise);
  }

  public openExerciseDialog(): Subscription {
    return this.exerciseClickSubject
      .pipe(
        withLatestFrom(this.exerciseTypeSubject),
        switchMap(([exercise, exerciseType]) =>
          from(
            this.modalController.create({
              component: ExerciseModalComponent,
              componentProps: {
                exercise,
                exerciseType,
              },
            })
          )
        )
      )
      .subscribe((modal) => modal.present());
  }
}
