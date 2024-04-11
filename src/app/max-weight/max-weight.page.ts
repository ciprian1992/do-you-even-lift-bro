import { Component, inject } from '@angular/core';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-max-weight',
  templateUrl: 'max-weight.page.html',
  styleUrls: ['max-weight.page.scss'],
})
export class MaxWeightPage {
  private auth = inject(Auth);
  private router = inject(Router);

  public user$ = user(this.auth);
  public userName$;

  constructor() {
    this.userName$ = this.user$.pipe(
      map((user) => user?.email || user?.displayName || 'Unknown')
    );
  }

  public async logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }
}
