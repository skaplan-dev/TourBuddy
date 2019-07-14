import { TestBed } from '@angular/core/testing';

import { MapboxService } from './mapbox.service';
import { HttpClient } from '@angular/common/http';

describe('MapboxService', () => {
  const httpMock = jasmine.createSpy('HttpClient');

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }]
    })
  );

  it('should be created', () => {
    const service: MapboxService = TestBed.get(MapboxService);
    expect(service).toBeTruthy();
  });
});
