import { TestBed } from '@angular/core/testing';

import { AllReceiptsService } from './all-receipts.service';

describe('AllReceiptsService', () => {
  let service: AllReceiptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllReceiptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
