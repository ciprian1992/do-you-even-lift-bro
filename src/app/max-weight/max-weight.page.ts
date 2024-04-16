import { Component, inject } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

@Component({
  selector: 'app-max-weight',
  templateUrl: 'max-weight.page.html',
  styleUrls: ['max-weight.page.scss'],
})
export class MaxWeightPage {
  private auth = inject(Auth);
  private router = inject(Router);
  private modalController = inject(ModalController);

  public user$ = user(this.auth);
  public userName$ = this.user$.pipe(
    map((user) => user?.email || user?.displayName || 'Unknown')
  );
  public exercises$;

  private firestore = inject(Firestore);
  private userId$ = this.user$.pipe(map((user) => user?.uid ?? ''));

  constructor() {
    this.userName$ = this.user$.pipe(
      map((user) => user?.email || user?.displayName || 'Unknown')
    );

    this.exercises$ = this.userId$.pipe(
      map((userId) => {
        return collection(getFirestore(), `users/${userId}/max-weights`);
      }),
      switchMap((collection) => collectionData(collection)),
      tap(console.log)
    );
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
