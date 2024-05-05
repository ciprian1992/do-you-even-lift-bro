import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { signOut } from 'firebase/auth';
import { map } from 'rxjs';

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

  public user$ = user(this.auth);
  public userName$ = this.user$.pipe(
    map((user) => user?.email || user?.displayName || 'Unknown')
  );

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }
}
