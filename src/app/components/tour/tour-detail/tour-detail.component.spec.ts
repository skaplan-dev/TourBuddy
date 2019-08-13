// TODO
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { TourDetailComponent } from './tour-detail.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { OrderModule } from 'ngx-order-pipe';
// import { MatDialog } from '@angular/material';
// import { DirectionsService } from 'src/app/services/directions.service';
// import { TourService } from 'src/app/services/tour.service';
// import { DirectionsFilterPipe } from 'src/app/pipes/directions-filter.pipe';
// import { RouterTestingModule } from '@angular/router/testing';

// describe('TourDetailComponent', () => {
//   let component: TourDetailComponent;
//   let fixture: ComponentFixture<TourDetailComponent>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [TourDetailComponent, DirectionsFilterPipe],
//       imports: [OrderModule, RouterTestingModule],
//       providers: [
//         {
//           provide: MatDialog,
//           useValue: jasmine.createSpy('MatDialog')
//         },
//         {
//           provide: DirectionsService,
//           useValue: jasmine.createSpyObj('DirectionsService', [
//             'resetDirectionsService',
//             'getDirections'
//           ])
//         },
//         {
//           provide: TourService,
//           useValue: jasmine.createSpyObj('tourService', ['getTourDates'])
//         }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TourDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
