import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { NzModule } from 'src/app/nz/nz.module';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileService } from 'src/app/services/file.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const authStub = {
    user: of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [NzModule, FormsModule, AngularFireModule, HttpClientModule],
      providers: [
        { provide: AngularFireAuth, useValue: authStub },
        {
          provide: FileService,
          useValue: jasmine.createSpyObj('fileService', [
            'uploadFile',
            'getDownloadURL',
            'deleteFileFromURL'
          ])
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('authService', [
            'updateProfile',
            'changePassword'
          ])
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
