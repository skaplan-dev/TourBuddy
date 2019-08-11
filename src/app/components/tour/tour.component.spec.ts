import { TourComponent } from './tour.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TourService } from 'src/app/services/tour.service';
import {
  MatDialog,
  MatProgressSpinnerModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule
} from '@angular/material';
import { FileService } from 'src/app/services/file.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BehaviorSubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  const getTours = jasmine.createSpy('getTours').and.callFake(() => {
    return {
      snapshotChanges: () => {
        return {
          pipe: () => {
            return new BehaviorSubject([
              {
                bandNames: ['pierre'],
                endDate: {
                  toDate: () => {
                    return new Date();
                  }
                },
                flyerRef: '0472498c-f34f-439e-a659-3f2c47a515d4',
                id: 'tibRExCELIJQ2sMMWu8H',
                startDate: {
                  toDate: () => {
                    return new Date();
                  }
                },
                tourName: 'Pierre\'s Summer T',
                uid: 'HNO0heNNVgTxZb0MRLiZCuFSnqC2'
              }
            ]).asObservable();
          }
        };
      }
    };
  });
  const tourService = { getTours: getTours };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      providers: [
        { provide: TourService, useValue: tourService },
        { provide: MatDialog, useValue: jasmine.createSpy('matDialog') },
        { provide: FileService, useValue: jasmine.createSpy('fileService') }
      ],
      imports: [
        MatProgressSpinnerModule,
        RouterTestingModule,
        MatIconModule,
        MatCardModule,
        LazyLoadImageModule,
        MatMenuModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
