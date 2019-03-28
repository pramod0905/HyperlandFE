import { TestBed, inject } from '@angular/core/testing';

import { FirmService } from './firm.service';

describe('FirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirmService]
    });
  });

  it('should be created', inject([FirmService], (service: FirmService) => {
    expect(service).toBeTruthy();
  }));
});
