import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageServiceModule } from 'ng-zorro-antd';
import { NzModule } from 'src/app/nz/nz.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('router', ['navigate']);
  const authSpy = {
    loginWithEmail: () => {
      Promise.resolve();
    },
    loginWithGoogle: () => {
      Promise.resolve();
    },
    registerWithEmail: () => {
      Promise.resolve();
    },
    updateProfile: jasmine.createSpy('updateProfile')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NzMessageServiceModule,
        NzModule
      ],
      providers: [
        { provide: Router, routerSpy },
        { provide: AuthService, useValue: authSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
