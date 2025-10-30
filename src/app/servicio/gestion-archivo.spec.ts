import { TestBed } from '@angular/core/testing';

import { GestionArchivo } from './gestion-archivo';

describe('GestionArchivo', () => {
  let service: GestionArchivo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionArchivo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
