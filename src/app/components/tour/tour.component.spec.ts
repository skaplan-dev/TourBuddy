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
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  const tourServiceMock = jasmine.createSpyObj('getTours', ['getTours']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      providers: [
        { provide: TourService, useValue: tourServiceMock },
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    tourServiceMock.getTours.and.returnValue({
      snapshotChanges: () => {
        return {
          pipe: () => {
            const storeSubjectMock = new BehaviorSubject([
              { startDate: { toDate: () => {} }, endDate: { toDate: () => {} } }
            ]);
            return storeSubjectMock.asObservable();
          }
        };
      }
    });
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
