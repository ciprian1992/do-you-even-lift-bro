import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { signOut } from 'firebase/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { exerciseType, exercisesMap } from './exercises.const';
import { Exercise } from '../add-edit-max-wieght-modal/exercises.const';

@Component({
  selector: 'app-exercises',
  templateUrl: 'exercises.page.html',
  styleUrls: ['exercises.page.scss'],
  imports: [CommonModule, IonicModule],
  standalone: true,
})
export class ExercisesPage {
  private auth = inject(Auth);
  private router = inject(Router);
  private exerciseTypeSubject = new BehaviorSubject<exerciseType>('push1');

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

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }

  public exerciseTypeChanged(event: CustomEvent) {
    this.exerciseTypeSubject.next(event.detail.value as exerciseType);
  }
}
