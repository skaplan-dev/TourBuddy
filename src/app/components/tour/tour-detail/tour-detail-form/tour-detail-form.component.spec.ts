import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailFormComponent } from './tour-detail-form.component';

describe('TourDetailFormComponent', () => {
  let component: TourDetailFormComponent;
  let fixture: ComponentFixture<TourDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
