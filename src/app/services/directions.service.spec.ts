import { TestBed } from '@angular/core/testing';
import { DirectionsService } from './directions.service';
import { TourService } from './tour.service';
import { MatDialog } from '@angular/material';
import { FileService } from './file.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

describe('DirectionsService', () => {
  const tourServiceMock = jasmine.createSpyObj('tourService', [
    'getTours',
    'createTour',
    'updateTour'
  ]);
  const dialogRef = jasmine.createSpyObj('MatDialog', ['open']);
  const fileServiceMock = jasmine.createSpyObj('fileService', [
    'getDownloadURL'
  ]);
  const firestoreMock = jasmine.createSpy('AngularFirestore');
  const httpMock = jasmine.createSpy('HttpClient');
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: TourService, useValue: tourServiceMock },
        { provide: MatDialog, useValue: dialogRef },
        { provide: FileService, useValue: fileServiceMock },
        { provide: AngularFirestore, firestoreMock },
        { provide: HttpClient, httpMock }
      ]
    })
  );

  it('should be created', () => {
    const service: DirectionsService = TestBed.get(DirectionsService);
    expect(service).toBeTruthy();
  });
});
