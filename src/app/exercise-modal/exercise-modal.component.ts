import { Component, Input, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExerciseWithInfo, exerciseType } from '../exercises/exercises.const';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import {
  combineLatest,
  from,
  map,
  Observable,
  shareReplay,
  Subject,
  Subscription,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import {
  collection,
  collectionData,
  getFirestore,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { MaxWeight } from '../domain';
import { limit } from 'firebase/firestore';
import { AddEditMaxWeightModalComponent } from '../add-edit-max-wieght-modal/add-edit-max-weight-modal.component';

@Component({
  selector: 'app-exercise-modal',
  templateUrl: 'exercise-modal.component.html',
  styleUrls: ['exercise-modal.component.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class ExerciseModalComponent implements OnInit {
  @Input() public exercise?: ExerciseWithInfo;

  public imageIsLoaded = false;
  public maxWeight$!: Observable<MaxWeight | null>;

  private addSubject = new Subject<void>();
  private auth = inject(Auth);
  private user$ = user(this.auth);
  private userId$ = this.user$.pipe(map((user) => user?.uid ?? ''));
  private modalController = inject(ModalController);
  private subscriptions = new Subscription();

  private modalCtrl = inject(ModalController);

  public ngOnInit(): void {
    this.maxWeight$ = this.userId$.pipe(
      switchMap((userId) => {
        const ref = collection(getFirestore(), `users/${userId}/max-weights`);

        const sortedQ = query(
          ref,
          where('exercise', '==', this.exercise?.value),
          orderBy('date', 'desc'),
          limit(1)
        );
        return collectionData(sortedQ, { idField: 'id' }) as Observable<
          MaxWeight[]
        >;
      }),
      map((maxweights) => (maxweights.length > 0 ? maxweights[0] : null)),
      shareReplay(1)
    );

    this.subscriptions.add(this.openAddDialog());
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public imageLoaded() {
    this.imageIsLoaded = true;
  }

  public onAddClick() {
    this.addSubject.next();
  }

  private openAddDialog(): Subscription {
    return this.addSubject
      .pipe(
        withLatestFrom(this.maxWeight$),
        switchMap(([, maxWeight]) =>
          from(
            this.modalController.create({
              component: AddEditMaxWeightModalComponent,
              componentProps: {
                maxWeight,
              },
            })
          )
        )
      )
      .subscribe((modal) => modal.present());
  }
}
