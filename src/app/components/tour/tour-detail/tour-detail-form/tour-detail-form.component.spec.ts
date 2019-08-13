import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TourDetailFormComponent } from './tour-detail-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MapboxService } from 'src/app/services/mapbox.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TourDetailFormComponent', () => {
  let component: TourDetailFormComponent;
  let fixture: ComponentFixture<TourDetailFormComponent>;

  const mapboxServiceMock = jasmine.createSpyObj('mapboxService', [
    'getCoordinates'
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TourDetailFormComponent],
      providers: [
        FormBuilder,
        { provide: MapboxService, useValue: mapboxServiceMock }
      ],
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
