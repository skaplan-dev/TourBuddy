import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetailFormComponent } from './tour-detail-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('TourDetailFormComponent', () => {
  let component: TourDetailFormComponent;
  let fixture: ComponentFixture<TourDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TourDetailFormComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailFormComponent);
    component = fixture.componentInstance;
    component.tourDate = {
      contact: { name: 'joe' },
      bandNames: ['test'],
      location: 'nyc',
      notes: 'lkasld'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
