import { TestBed } from '@angular/core/testing';

import { ConsultaRest } from './consulta-rest';

describe('ConsultaRest', () => {
  let service: ConsultaRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
