import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.User;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  public getUserValueChanges(userId: string): Observable<any> {
    return this.afs
      .collection<User>('users')
      .doc(userId)
      .valueChanges();
  }

  public getUid(): string {
    return this.user ? this.user.uid : '';
  }

  public logOut() {
    return this.afAuth.auth.signOut();
  }

  public loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  public registerWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public changePassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.user.email);
  }

  public updateProfile(data) {
    this.user.updateProfile(data);
  }
}
