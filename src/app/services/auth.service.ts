import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  public getUid(): string {
    return this.user ? this.user.uid : '';
  }

  public logOut() {
    this.afAuth.auth.signOut();
  }
}
