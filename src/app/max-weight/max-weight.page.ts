import { Component, inject } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  IonicModule,
  ModalController,
  SegmentCustomEvent,
} from '@ionic/angular';
import { map, switchMap, tap } from 'rxjs/operators';
import { AddEditMaxWeightModalComponent } from '../add-edit-max-wieght-modal/add-edit-max-weight-modal.component';

import {
  Firestore,
  collection,
  collectionData,
  docSnapshots,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { MaxWeight } from '../domain';
import { CommonModule, NgSwitchDefault } from '@angular/common';
import { ExercisePipe } from './exercise.pipe';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { MuscleGroup } from '../add-edit-max-wieght-modal/musle-groups.const';

@Component({
  selector: 'app-max-weight',
  templateUrl: 'max-weight.page.html',
  styleUrls: ['max-weight.page.scss'],
  imports: [CommonModule, IonicModule, ExercisePipe],
  standalone: true,
})
export class MaxWeightPage {
  private auth = inject(Auth);
  private router = inject(Router);
  private modalController = inject(ModalController);

  public user$ = user(this.auth);
  public userName$ = this.user$.pipe(
    map((user) => user?.email || user?.displayName || 'Unknown')
  );
  public maxWeights$;

  private muscleGroupSubject = new BehaviorSubject<MuscleGroup>('pull');
  private userId$ = this.user$.pipe(map((user) => user?.uid ?? ''));
  private firestore = inject(Firestore);

  constructor() {
    this.userName$ = this.user$.pipe(
      map((user) => user?.email || user?.displayName || 'Unknown')
    );

    // To investigate

    this.maxWeights$ = combineLatest([
      this.userId$,
      this.muscleGroupSubject,
    ]).pipe(
      switchMap(([userId, muscleGroup]) => {
        const ref = collection(getFirestore(), `users/${userId}/max-weights`);

        const q = query(ref, where('muscleGroup', '==', muscleGroup));

        const sortedQ = query(
          ref,
          where('muscleGroup', '==', muscleGroup),
          orderBy('date', 'desc')
        );
        return collectionData(sortedQ) as Observable<MaxWeight[]>;
      })
    );
  }

  public muscleGroupChanged(event: SegmentCustomEvent): void {
    this.muscleGroupSubject.next(event.detail.value as MuscleGroup);
  }

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }

  public openAddEditModal() {
    this.modalController
      .create({
        component: AddEditMaxWeightModalComponent,
      })
      .then((modal) => modal.present());
  }

  //get max-weight for user
}
