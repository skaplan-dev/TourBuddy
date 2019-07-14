import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: Router, routerSpy }],
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
