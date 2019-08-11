import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecondsToHoursPipe } from 'src/app/pipes/seconds-to-hours.pipe';
import { MetersToMilesPipe } from 'src/app/pipes/meters-to-miles.pipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, SecondsToHoursPipe, MetersToMilesPipe],
      providers: [
        {
          provide: AngularFirestore,
          useValue: jasmine.createSpy('AngularFirestore')
        },
        {
          provide: HttpClient,
          useValue: jasmine.createSpy('HttpClient')
        }
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
