import { TestBed } from '@angular/core/testing';

import { GestionNoticias } from './gestion-noticias';

describe('GestionNoticias', () => {
  let service: GestionNoticias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNoticias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
