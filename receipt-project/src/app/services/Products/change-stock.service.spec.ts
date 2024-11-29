import { TestBed } from '@angular/core/testing';

import { ChangeStockService } from './change-stock.service';

describe('ChangeStockService', () => {
  let service: ChangeStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
