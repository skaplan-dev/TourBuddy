import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const routerSpy = jasmine.createSpyObj('router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: Router, routerSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
