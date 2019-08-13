import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.logOut();
      }
    });
  }

  public getUid(): string {
    return this.user ? this.user.uid : '';
  }

  public logOut() {
    this.router.navigate(['/login']);
  }
}
