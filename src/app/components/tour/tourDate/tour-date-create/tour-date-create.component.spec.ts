import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDateCreateComponent } from './tour-date-create.component';

describe('TourDateCreateComponent', () => {
  let component: TourDateCreateComponent;
  let fixture: ComponentFixture<TourDateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
