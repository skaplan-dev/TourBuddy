import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { AngularFireStorage } from '@angular/fire/storage';

describe('FileService', () => {
  const fireStorageMock = jasmine.createSpyObj('AngularFireStorage', [
    'ref',
    'upload'
  ]);
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireStorage, useValue: fireStorageMock }]
    })
  );

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
