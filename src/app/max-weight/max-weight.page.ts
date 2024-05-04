import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AlertController,
  IonicModule,
  ModalController,
  SegmentCustomEvent,
} from '@ionic/angular';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AddEditMaxWeightModalComponent } from '../add-edit-max-wieght-modal/add-edit-max-weight-modal.component';

import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
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
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  from,
} from 'rxjs';
import { MuscleGroup } from '../add-edit-max-wieght-modal/musle-groups.const';

@Component({
  selector: 'app-max-weight',
  templateUrl: 'max-weight.page.html',
  styleUrls: ['max-weight.page.scss'],
  imports: [CommonModule, IonicModule, ExercisePipe],
  standalone: true,
})
export class MaxWeightPage implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private modalController = inject(ModalController);

  public user$ = user(this.auth);
  public userName$ = this.user$.pipe(
    map((user) => user?.email || user?.displayName || 'Unknown')
  );
  public maxWeights$;

  private addEditSubject = new Subject<string | undefined>();
  private deleteSubject = new Subject<string>();
  private deleteConfirmSubject = new Subject<string>();
  private muscleGroupSubject = new BehaviorSubject<MuscleGroup>('pull');
  private userId$ = this.user$.pipe(map((user) => user?.uid ?? ''));
  private subscriptions = new Subscription();

  constructor() {
    this.userName$ = this.user$.pipe(
      map((user) => user?.email || user?.displayName || 'Unknown'),
      shareReplay(1)
    );

    this.maxWeights$ = combineLatest([
      this.userId$,
      this.muscleGroupSubject,
    ]).pipe(
      switchMap(([userId, muscleGroup]) => {
        const ref = collection(getFirestore(), `users/${userId}/max-weights`);

        const sortedQ = query(
          ref,
          where('muscleGroup', '==', muscleGroup),
          orderBy('date', 'desc')
        );
        return collectionData(sortedQ, { idField: 'id' }) as Observable<
          MaxWeight[]
        >;
      }),
      shareReplay(1)
    );
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.deleteOnCofirm());
    this.subscriptions.add(this.openAddEditDialog());
    this.subscriptions.add(this.openDeleteAlert());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public muscleGroupChanged(event: SegmentCustomEvent): void {
    this.muscleGroupSubject.next(event.detail.value as MuscleGroup);
  }

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }

  public onAddEditClick(id?: string) {
    this.addEditSubject.next(id);
  }

  public onDeleteClick(id: string) {
    this.deleteSubject.next(id);
  }

  private openAddEditDialog(): Subscription {
    return this.addEditSubject
      .pipe(
        switchMap((id) =>
          from(
            this.modalController.create({
              component: AddEditMaxWeightModalComponent,
              componentProps: {
                id,
              },
            })
          )
        )
      )
      .subscribe((modal) => modal.present());
  }

  private openDeleteAlert(): Subscription {
    return this.deleteSubject.subscribe((id) => {
      this.alertController
        .create({
          header: 'Delete Max Weight?',
          message: 'Are you sure you want to delete this max weight?',
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: 'Confirm',
              handler: () => this.deleteConfirmSubject.next(id),
            },
          ],
        })
        .then((alert) => alert.present());
    });
  }

  private deleteOnCofirm(): Subscription {
    return this.deleteConfirmSubject
      .pipe(
        withLatestFrom(this.userId$),
        switchMap(([id, userId]) => {
          const ref = collection(getFirestore(), `users/${userId}/max-weights`);

          return from(deleteDoc(doc(ref, id)));
        })
      )
      .subscribe();
  }
}
