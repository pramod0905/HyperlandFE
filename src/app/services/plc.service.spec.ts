import { TestBed, inject } from '@angular/core/testing';

import { PLCService } from './plc.service';

describe('PLCService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PLCService]
    });
  });

  it('should be created', inject([PLCService], (service: PLCService) => {
    expect(service).toBeTruthy();
  }));
});
