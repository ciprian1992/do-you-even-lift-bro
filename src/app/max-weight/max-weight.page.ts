import { Component, inject } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  IonicModule,
  ModalController,
  SegmentCustomEvent,
} from '@ionic/angular';
import { User } from 'firebase/auth';
import { map, switchMap, tap } from 'rxjs/operators';
import { AddEditMaxWeightModalComponent } from '../add-edit-max-wieght-modal/add-edit-max-weight-modal.component';
import { doc } from 'rxfire/firestore';

import {
  Firestore,
  collection,
  collectionData,
  getFirestore,
} from '@angular/fire/firestore';
import { MaxWeight } from '../domain';
import { CommonModule } from '@angular/common';
import { ExercisePipe } from './exercise.pipe';

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

  private firestore = inject(Firestore);
  private userId$ = this.user$.pipe(map((user) => user?.uid ?? ''));

  constructor() {
    this.userName$ = this.user$.pipe(
      map((user) => user?.email || user?.displayName || 'Unknown')
    );

    // To investigate

    this.maxWeights$ = this.userId$.pipe(
      map((userId) => {
        return collection(getFirestore(), `users/${userId}/max-weights`);
      }),
      switchMap((collection) => collectionData<MaxWeight>(collection as any)), // Add type assertion here
      tap(console.log)
    );
  }

  public exerciseTypeChanged(event: SegmentCustomEvent): void {}

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
