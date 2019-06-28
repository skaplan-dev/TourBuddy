import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, () => 'Tour Buddy', {
      enableFirestoreSync: true,
      toastMessageOnAuthSuccess: true,
      toastMessageOnAuthError: true,
      authGuardFallbackURL: '/login'
    }),
    BrowserAnimationsModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: StorageBucket, useValue: environment.firebase.storageBucket }
  ]
})
export class FirebaseModule {}
