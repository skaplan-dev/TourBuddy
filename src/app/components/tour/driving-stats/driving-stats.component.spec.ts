import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrivingStatsComponent } from './driving-stats.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecondsToHoursPipe } from 'src/app/pipes/seconds-to-hours.pipe';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';

describe('DrivingStatsComponent', () => {
  let component: DrivingStatsComponent;
  let fixture: ComponentFixture<DrivingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DrivingStatsComponent,
        SecondsToHoursPipe,
        MetersToMilesPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
