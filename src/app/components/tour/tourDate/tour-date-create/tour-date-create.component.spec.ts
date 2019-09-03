import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TourDateCreateComponent } from './tour-date-create.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapboxService } from 'src/app/services/mapbox.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TourDateCreateComponent', () => {
  let component: TourDateCreateComponent;
  let fixture: ComponentFixture<TourDateCreateComponent>;
  const mapboxMock = jasmine.createSpyObj('mapboxService', ['getCoordinates']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourDateCreateComponent],
      providers: [
        FormBuilder,
        { provide: MapboxService, useValue: mapboxMock }
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
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
