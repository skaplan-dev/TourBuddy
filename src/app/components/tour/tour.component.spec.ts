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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpy('matDialog') },
        { provide: FileService, useValue: jasmine.createSpy('fileService') },
        {
          provide: TourService,
          useValue: {
            getTours: () => {
              return {
                snapshotChanges: () => {
                  return {
                    pipe: () => {
                      const storeSubjectMock = new BehaviorSubject([
                        {
                          startDate: { toDate: () => {} },
                          endDate: { toDate: () => {} }
                        },
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
          }
        }
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
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
