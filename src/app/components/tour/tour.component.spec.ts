import { TourComponent } from './tour.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TourService } from 'src/app/services/tour.service';
import { FileService } from 'src/app/services/file.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NzModule } from 'src/app/nz/nz.module';

describe('TourComponent', () => {
  let component: TourComponent;
  let fixture: ComponentFixture<TourComponent>;
  const tourServiceMock = jasmine.createSpyObj('tourService', ['getTours']);

  beforeEach(async(() => {
    tourServiceMock.getTours.and.returnValue({
      snapshotChanges: () => {
        return {
          pipe: () => {}
        };
      }
    });
    TestBed.configureTestingModule({
      declarations: [TourComponent],
      providers: [
        { provide: TourService, useValue: tourServiceMock },
        {
          provide: FileService,
          useValue: jasmine.createSpyObj('fileService', ['getDownloadURL'])
        }
      ],
      imports: [RouterTestingModule, NzModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
