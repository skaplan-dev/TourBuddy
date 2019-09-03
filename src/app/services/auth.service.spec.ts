import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve())
    })
  })
};

const authStub = {
  authState: of({})
};

describe('AuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AngularFireAuth, useValue: authStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
