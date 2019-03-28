import { TestBed, inject } from '@angular/core/testing';

import { PropertytypeService } from './propertytype.service';

describe('PropertytypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertytypeService]
    });
  });

  it('should be created', inject([PropertytypeService], (service: PropertytypeService) => {
    expect(service).toBeTruthy();
  }));
});
