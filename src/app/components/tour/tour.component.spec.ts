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
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  const mockTourService = {
    getTours: () => {
      return {
        snapshotChanges: () => {
          return {
            pipe: () => {
              const storeSubjectMock = new BehaviorSubject([
                {
                  startDate: { toDate: () => {} },
                  endDate: { toDate: () => {} }
                }
              ]);
              return storeSubjectMock.asObservable();
            }
          };
        }
      };
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      providers: [
        { provide: TourService, useValue: mockTourService },
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
