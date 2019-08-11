import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingStatsComponent } from './driving-stats.component';

describe('DrivingStatsComponent', () => {
  let component: DrivingStatsComponent;
  let fixture: ComponentFixture<DrivingStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingStatsComponent ]
    })
    .compileComponents();
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
