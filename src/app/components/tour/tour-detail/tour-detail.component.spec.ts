import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetailComponent } from './tour-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of, BehaviorSubject } from 'rxjs';
import { DirectionsService } from 'src/app/services/directions.service';
import { TourService } from 'src/app/services/tour.service';
import { DirectionsFilterPipe } from 'src/app/pipes/directions-filter.pipe';

describe('TourDetailComponent', () => {
  let component: TourDetailComponent;
  let fixture: ComponentFixture<TourDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourDetailComponent, DirectionsFilterPipe],
      imports: [OrderModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: 1 })) }
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpy('MatDialog')
        },
        {
          provide: DirectionsService,
          useValue: jasmine.createSpyObj('DirectionsService', [
            'resetDirectionsService',
            'getDirections'
          ])
        },
        {
          provide: TourService,
          useValue: {
            getTourDates: () => {
              return {
                snapshotChanges: () => {
                  return {
                    pipe: () => {
                      const storeSubjectMock = new BehaviorSubject([
                        { date: { toDate: () => {} } }
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
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
