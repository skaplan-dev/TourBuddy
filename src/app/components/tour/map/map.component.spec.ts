import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecondsToHoursPipe } from 'src/app/pipes/seconds-to-hours.pipe';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';
import { DirectionsService } from 'src/app/services/directions.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const directionsServiceMock = jasmine.createSpyObj('directionsService', [
    'resetDirectionsService'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, SecondsToHoursPipe, MetersToMilesPipe],
      providers: [
        { provide: DirectionsService, useValue: directionsServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
