import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('AuthService', () => {
  const authState = {
    subscribe: () => ({})
  };
  const mockAngularFireAuth: any = {
    authState: of(authState)
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
