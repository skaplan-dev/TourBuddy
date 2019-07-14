import { TestBed } from '@angular/core/testing';

import { TourService } from './tour.service';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('TourService', () => {
  const authServiceMock = jasmine.createSpy('AuthService');
  const firestoreMock = jasmine.createSpy('AngularFirestore');

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    })
  );

  it('should be created', () => {
    const service: TourService = TestBed.get(TourService);
    expect(service).toBeTruthy();
  });
});
