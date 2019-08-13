import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TourCreateComponent } from './tour-create.component';
import { FileService } from 'src/app/services/file.service';

describe('TourCreateComponent', () => {
  let component: TourCreateComponent;
  let fixture: ComponentFixture<TourCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TourCreateComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [{ contact: {} }] },
        {
          provide: FileService,
          useValue: jasmine.createSpyObj('fileService', ['uploadFile'])
        },
        FormBuilder
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
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
