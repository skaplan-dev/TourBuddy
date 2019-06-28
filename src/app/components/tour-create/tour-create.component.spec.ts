import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCreateComponent } from './tour-create.component';

describe('TourCreateComponent', () => {
  let component: TourCreateComponent;
  let fixture: ComponentFixture<TourCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
